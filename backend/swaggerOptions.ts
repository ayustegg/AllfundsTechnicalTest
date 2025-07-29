import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Allfunds Technical Test API",
      version: "1.0.0",
      description: "Technical test AllFunds - API for managing News items",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        NewsItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            content: { type: "string" },
            author: { type: "string" },
            date: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/news.ts"],
};

export default swaggerOptions;
