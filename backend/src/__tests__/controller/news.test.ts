import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import News from "../../models/news";
import {
  getActiveNews,
  getArchiveNews,
  archiveNews,
  createNews,
  deleteNews,
} from "../../controller/news";

const app = express();
app.use(express.json());

app.get("/news/active", getActiveNews);
app.get("/news/archive", getArchiveNews);
app.post("/news", createNews);
app.put("/news/:id/archive", archiveNews);
app.delete("/news/:id", deleteNews);

describe("News Controller Tests", () => {
  const testNews = {
    title: "Test News",
    description: "Test Description",
    content: "Test Content",
    date: "2025-07-30T00:00:00.000Z",
    author: "Test Author",
  };

  const archivedNews = {
    title: "Archived News",
    description: "Archived Description",
    content: "Archived Content",
    date: "2024-07-30T00:00:00.000Z",
    author: "Archived Author",
    archiveDate: new Date("2025-07-30T00:00:00.000Z"),
  };

  describe("GET endpoint /news/active", () => {
    beforeEach(async () => {
      await News.create([
        { ...testNews, date: new Date("2025-07-30T00:00:00.000Z") },
        {
          ...testNews,
          title: "Test News 2",
          date: new Date("2025-07-30T00:00:00.000Z"),
        },
        {
          ...testNews,
          title: "Test News 3",
          date: new Date("2025-07-30T00:00:00.000Z"),
        },
      ]);
    });

    it("should get active news with pagination", async () => {
      const response = await request(app).get("/news/active").expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("currentPage");
      expect(response.body).toHaveProperty("totalPages");
      expect(response.body).toHaveProperty("totalItems");
      expect(response.body.data).toHaveLength(3);
      expect(response.body.currentPage).toBe(1);
      expect(response.body.totalItems).toBe(3);
    });

    it("should get active news with custom pagination", async () => {
      const response = await request(app)
        .get("/news/active?page=1&limit=2")
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.currentPage).toBe(1);
      expect(response.body.totalPages).toBe(2);
    });

    it("should handle database errors", async () => {
      await mongoose.disconnect();

      const response = await request(app).get("/news/active").expect(500);

      expect(response.body).toHaveProperty("message");

      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/test"
      );
    });
  });

  describe("GET endpoint /news/archive", () => {
    beforeEach(async () => {
      await News.create([
        { ...archivedNews, archiveDate: new Date("2025-07-30T00:00:00.000Z") },
        {
          ...archivedNews,
          title: "Archived News 2",
          archiveDate: new Date("2025-07-30T00:00:00.000Z"),
        },
      ]);
    });

    it("should get archived news", async () => {
      const response = await request(app).get("/news/archive").expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toHaveProperty("archiveDate");
      expect(response.body.data[0].archiveDate).not.toBeNull();
    });
  });

  describe("POST endpoint /news", () => {
    it("should create a new news with valid data", async () => {
      const response = await request(app)
        .post("/news")
        .send(testNews)
        .expect(201);

      expect(response.body).toHaveProperty("_id");
      expect(response.body.title).toBe(testNews.title);
      expect(response.body.description).toBe(testNews.description);
      expect(response.body.content).toBe(testNews.content);
      expect(response.body.author).toBe(testNews.author);
    });

    it("should create a new news with invalid data", async () => {
      const invalidNews = {
        title: "",
        description: "Test",
        content: "Test",
        date: "invalid-date",
        author: "Test",
      };

      const response = await request(app)
        .post("/news")
        .send(invalidNews)
        .expect(400);

      expect(response.body).toHaveProperty("message");
    });
  });

  describe("PUT endpoint /news/:id/archive", () => {
    let newsId: string;

    beforeEach(async () => {
      const news = await News.create(testNews);
      newsId = (news as any)._id.toString();
    });

    it("should archive an existing news", async () => {
      const response = await request(app)
        .put(`/news/${newsId}/archive`)
        .expect(200);

      expect(response.body.message).toBe("New Archived");

      const archivedNews = await News.findById(newsId);
      expect(archivedNews?.archiveDate).not.toBeNull();
    });

    it("should return 404 for non-existent news", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const response = await request(app)
        .put(`/news/${fakeId}/archive`)
        .expect(404);

      expect(response.body.message).toBe("New not found");
    });
  });

  describe("DELETE endpoint /news/:id", () => {
    let newsId: string;

    beforeEach(async () => {
      const news = await News.create(testNews);
      newsId = (news as any)._id.toString();
    });

    it("should delete an existing news", async () => {
      const response = await request(app).delete(`/news/${newsId}`).expect(200);

      expect(response.body.message).toBe("New Deleted");

      const deletedNews = await News.findById(newsId);
      expect(deletedNews).toBeNull();
    });

    it("should return 404 for no existent news", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      const response = await request(app).delete(`/news/${fakeId}`).expect(404);

      expect(response.body.message).toBe("New not found");
    });
  });
});
