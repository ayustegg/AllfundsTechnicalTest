import mongoose from "mongoose";
import News from "../../models/news";
import connectDB from "./db";

const seedData = [
  {
    title: "Introduction to MongoDB",
    description: "Basic guide to get started with MongoDB.",
    date: new Date("2025-07-01T09:00:00Z"),
    content: "MongoDB is a NoSQL document-oriented database...",
    author: "Laura García",
    archiveDate: null,
  },
  {
    title: "Understanding JSON Structure",
    description: "Learn how to structure data efficiently using JSON.",
    date: new Date("2025-06-15T12:30:00Z"),
    content:
      "JSON (JavaScript Object Notation) is a lightweight data interchange format...",
    author: "Carlos Pérez",
    archiveDate: null,
  },
  {
    title: "Advanced MongoDB Queries",
    description: "Explore complex querying techniques in MongoDB.",
    date: new Date("2025-06-20T10:00:00Z"),
    content:
      "Beyond basic finds, MongoDB offers powerful aggregation pipelines and text search capabilities.",
    author: "María Fernández",
    archiveDate: null,
  },
  {
    title: "Optimizing MongoDB with Indexes",
    description:
      "Improve your database performance through effective indexing strategies.",
    date: new Date("2025-05-10T11:15:00Z"),
    content:
      "Properly configured indexes are crucial for fast data retrieval in large MongoDB collections.",
    author: "Juan Ramírez",
    archiveDate: null,
  },
  {
    title: "MongoDB Aggregation Framework Deep Dive",
    description:
      "Transform and analyze data with MongoDB's powerful aggregation pipelines.",
    date: new Date("2025-04-25T08:45:00Z"),
    content:
      "The aggregation framework provides a flexible way to process data in stages, similar to SQL's GROUP BY.",
    author: "Ana Torres",
    archiveDate: null,
  },
  {
    title: "Effective Schema Design for NoSQL",
    description:
      "Best practices for designing flexible and performant schemas in MongoDB.",
    date: new Date("2025-03-01T14:00:00Z"),
    content:
      "While schemaless, thoughtful schema design in MongoDB prevents common pitfalls and boosts performance.",
    author: "Luis Mendoza",
    archiveDate: null,
  },
  {
    title: "Deploying MongoDB on Atlas",
    description:
      "A guide to setting up and managing your MongoDB database in the cloud with Atlas.",
    date: new Date("2025-02-18T16:20:00Z"),
    content:
      "MongoDB Atlas simplifies database deployment, scaling, and maintenance with its fully managed service.",
    author: "Claudia Ríos",
    archiveDate: null,
  },
  {
    title: "Ensuring High Availability with Replica Sets",
    description:
      "Configure MongoDB replica sets for data redundancy and automatic failover.",
    date: new Date("2025-01-05T10:30:00Z"),
    content:
      "Replica sets are the foundation for high availability in MongoDB, providing automatic data synchronization.",
    author: "Diego Herrera",
    archiveDate: null,
  },
  {
    title: "Scaling MongoDB with Sharding",
    description:
      "Achieve horizontal scalability for massive datasets using MongoDB sharding.",
    date: new Date("2024-12-10T13:10:00Z"),
    content:
      "Sharding allows MongoDB to distribute data across multiple machines, enabling applications to handle more data and traffic.",
    author: "Elena Martínez",
    archiveDate: null,
  },
  {
    title: "MongoDB Security Fundamentals",
    description:
      "Essential security measures to protect your MongoDB deployments.",
    date: new Date("2024-11-20T15:45:00Z"),
    content:
      "Implementing authentication, authorization, and encryption is crucial for securing your MongoDB data.",
    author: "Sergio López",
    archiveDate: new Date("2025-10-01T00:00:00Z"),
  },
  {
    title: "Backup and Restore Strategies for MongoDB",
    description:
      "Learn how to effectively back up and restore your MongoDB data.",
    date: new Date("2024-10-05T09:00:00Z"),
    content:
      "Regular backups are vital for disaster recovery and ensuring data integrity.",
    author: "Isabel Núñez",
    archiveDate: null,
  },
  {
    title: "Monitoring MongoDB Performance",
    description: "Tools and techniques for monitoring your MongoDB database.",
    date: new Date("2024-09-12T11:00:00Z"),
    content:
      "Effective monitoring helps identify performance bottlenecks and ensures optimal database operation.",
    author: "Roberto Giménez",
    archiveDate: null,
  },
  {
    title: "Transactions in MongoDB",
    description: "Understanding multi-document ACID transactions in MongoDB.",
    date: new Date("2024-08-01T14:00:00Z"),
    content:
      "MongoDB now supports multi-document ACID transactions, bringing consistency guarantees to distributed data.",
    author: "Patricia Díaz",
    archiveDate: null,
  },
  {
    title: "Geospatial Queries in MongoDB",
    description:
      "Leverage MongoDB's geospatial capabilities for location-based applications.",
    date: new Date("2024-07-20T10:00:00Z"),
    content:
      "MongoDB offers powerful operators for querying and analyzing geospatial data, perfect for maps and location services.",
    author: "Fernando Ruiz",
    archiveDate: null,
  },
  {
    title: "Text Search with MongoDB",
    description: "Implement full-text search functionality using MongoDB.",
    date: new Date("2024-06-15T12:00:00Z"),
    content:
      "MongoDB's text search capabilities allow for efficient searching of string content within your documents.",
    author: "Gabriela Castro",
    archiveDate: null,
  },
  {
    title: "Change Streams in MongoDB",
    description: "Real-time data processing with MongoDB change streams.",
    date: new Date("2024-05-01T09:30:00Z"),
    content:
      "Change streams provide a real-time feed of changes happening in your database, enabling reactive applications.",
    author: "Héctor Soto",
    archiveDate: null,
  },
  {
    title: "MongoDB and Node.js Integration",
    description:
      "Connecting and interacting with MongoDB from a Node.js application.",
    date: new Date("2024-04-10T11:45:00Z"),
    content:
      "The official MongoDB Node.js driver makes it easy to build powerful applications with MongoDB.",
    author: "Carolina Vargas",
    archiveDate: null,
  },
  {
    title: "Data Modeling Patterns in MongoDB",
    description:
      "Explore common data modeling patterns for different use cases.",
    date: new Date("2024-03-25T13:00:00Z"),
    content:
      "Choosing the right data model can significantly impact performance and flexibility in MongoDB.",
    author: "Ricardo Morales",
    archiveDate: null,
  },
  {
    title: "Understanding MongoDB Write Concerns",
    description: "Control the durability of your write operations in MongoDB.",
    date: new Date("2024-02-14T15:00:00Z"),
    content:
      "Write concerns determine the level of acknowledgment MongoDB provides for write operations.",
    author: "Andrea Castillo",
    archiveDate: null,
  },
  {
    title: "Read Preferences in MongoDB",
    description:
      "How to direct read operations to different members of a replica set.",
    date: new Date("2024-01-30T10:00:00Z"),
    content:
      "Read preferences allow you to control which replica set member MongoDB directs read operations to.",
    author: "Javier Ortega",
    archiveDate: null,
  },
  {
    title: "MongoDB Compass: Your GUI Tool",
    description: "Navigating and managing your MongoDB data with Compass.",
    date: new Date("2023-12-01T16:00:00Z"),
    content:
      "MongoDB Compass is a powerful GUI that helps you interact with your MongoDB database visually.",
    author: "Silvia Castro",
    archiveDate: null,
  },
  {
    title: "Using GridFS for Large Files",
    description: "Storing and retrieving large files in MongoDB with GridFS.",
    date: new Date("2023-11-15T11:00:00Z"),
    content:
      "GridFS is a specification for storing and retrieving large files that exceed the BSON document size limit.",
    author: "Mario López",
    archiveDate: null,
  },
  {
    title: "MongoDB and Docker: Containerization",
    description: "Deploying MongoDB using Docker containers.",
    date: new Date("2023-10-20T09:00:00Z"),
    content:
      "Docker provides a convenient way to package and deploy MongoDB instances in isolated environments.",
    author: "Laura Fernández",
    archiveDate: null,
  },
  {
    title: "Performance Tuning MongoDB",
    description:
      "Strategies for optimizing the performance of your MongoDB database.",
    date: new Date("2023-09-05T14:30:00Z"),
    content:
      "Various techniques can be applied to fine-tune MongoDB for peak performance, including schema optimization and query analysis.",
    author: "Pablo Ruiz",
    archiveDate: null,
  },
  {
    title: "Auditing in MongoDB Enterprise",
    description: "Tracking database activities for compliance and security.",
    date: new Date("2023-08-10T10:00:00Z"),
    content:
      "MongoDB Enterprise Advanced offers comprehensive auditing capabilities to monitor database operations.",
    author: "Sofía Torres",
    archiveDate: null,
  },
  {
    title: "WiredTiger Storage Engine Overview",
    description: "Understanding MongoDB's default storage engine.",
    date: new Date("2023-07-25T12:00:00Z"),
    content:
      "WiredTiger is the default storage engine for MongoDB, offering high performance and scalability.",
    author: "Daniel Castro",
    archiveDate: null,
  },
  {
    title: "Managing Users and Roles in MongoDB",
    description: "Administering database access and permissions.",
    date: new Date("2023-06-01T15:00:00Z"),
    content:
      "MongoDB's robust security model allows for fine-grained control over user access and roles.",
    author: "Mariana Rojas",
    archiveDate: null,
  },
  {
    title: "Introduction to Mongoose ODM",
    description: "Simplifying MongoDB interactions in Node.js with Mongoose.",
    date: new Date("2023-05-18T10:00:00Z"),
    content:
      "Mongoose provides a straightforward, schema-based solution to model your application data.",
    author: "Andrés Gómez",
    archiveDate: null,
  },
  {
    title: "Populating References in Mongoose",
    description:
      "Retrieving related documents using Mongoose's populate feature.",
    date: new Date("2023-04-03T11:00:00Z"),
    content:
      "Populate allows you to reference documents in other collections and retrieve them seamlessly.",
    author: "Valeria Soto",
    archiveDate: null,
  },
  {
    title: "Middleware in Mongoose",
    description: "Automating tasks with pre and post hooks in Mongoose.",
    date: new Date("2023-03-08T13:00:00Z"),
    content:
      "Mongoose middleware (hooks) let you define functions that execute before or after certain operations.",
    author: "Felipe Herrera",
    archiveDate: null,
  },
  {
    title: "Virtuals in Mongoose Schemas",
    description: "Adding computed properties to your Mongoose models.",
    date: new Date("2023-02-20T09:00:00Z"),
    content:
      "Virtuals are document properties that you can get and set but that do not persist to MongoDB.",
    author: "Natalia Vega",
    archiveDate: null,
  },
  {
    title: "Validation in Mongoose",
    description: "Ensuring data integrity with schema validation.",
    date: new Date("2023-01-15T14:00:00Z"),
    content:
      "Mongoose provides built-in validation to ensure data conforms to your schema definitions.",
    author: "Gustavo Cifuentes",
    archiveDate: null,
  },
];

async function seedDB() {
  try {
    await connectDB();
    await News.deleteMany({});
    await News.insertMany(seedData);
    await mongoose.disconnect();
    console.log("Seed OK");
  } catch (error) {
    console.error("Error in seeding the database:", error);
  }
}

seedDB();
