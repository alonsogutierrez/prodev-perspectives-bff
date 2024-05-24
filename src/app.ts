import express from "express";
import healthRouter from "./api/health/insfrastructure/route";
import postsRouter from "./api/posts/insfrastructure/routes";
import usersRouter from "./api/users/insfrastructure/routes";
import imagesRouter from "./api/images/insfrastructure/routes";

import MongoDbClient from "./api/shared/insfrastructure/mongoDbClient";

const app = express();

try {
  const mongoDBRepo: MongoDbClient = new MongoDbClient();
  mongoDBRepo.connectDB();
} catch (err: any) {
  throw new Error(`Error connecting with MongoDB: ${err?.message}`);
}
// Middleware to parse JSON request bodies
app.use(express.json());

// Routers
app.use(healthRouter);
app.use(postsRouter);
app.use(usersRouter);
app.use(imagesRouter);

export default app;
