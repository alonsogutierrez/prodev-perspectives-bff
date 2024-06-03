import express from "express";
import healthRouter from "./api/health/infrastructure/route";
import postsRouter from "./api/posts/infrastructure/routes";
import usersRouter from "./api/users/infrastructure/routes";
import imagesRouter from "./api/images/infrastructure/routes";
import bannersRouter from "./api/banners/infrastructure/routes";

import MongoDbClient from "./api/shared/infrastructure/mongoDbClient";

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
app.use(bannersRouter);

export default app;
