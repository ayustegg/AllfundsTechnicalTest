import express from "express";
const router = express.Router();
import {
  getActiveNews,
  getArchiveNews,
  archiveNews,
  createNews,
  deleteNews,
  seedDatabase,
} from "../controller/news";

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get news with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Number of the page to fetch
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of active news
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NewsItem'
 *                 totalPages:
 *                   type: integer
 */
router.get("/", getActiveNews);

/**
 * @swagger
 * /api/news/archive:
 *   get:
 *     summary: Get archived news with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Number of the page to fetch
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of archived news
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 */
router.get("/archive", getArchiveNews);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a new news item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsItem'
 *     responses:
 *       201:
 *         description: News item created successfully
 */
router.post("/", createNews);

/**
 * @swagger
 * /api/news/{id}/archive:
 *   put:
 *     summary: Archive a news item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the news item to archive
 *     responses:
 *       200:
 *         description: News item archived successfully
 */
router.put("/:id/archive", archiveNews);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete a news item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the news item to delete
 *     responses:
 *       200:
 *         description: News item deleted successfully
 */
router.delete("/:id", deleteNews);

/**
 * @swagger
 * /api/news/seed:
 *   post:
 *     summary: Seed the database with sample news data
 *     responses:
 *       200:
 *         description: Database seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NewsItem'
 */
router.post("/seed", seedDatabase);

export default router;
