import express from 'express';
import dotenv from 'dotenv';

import healthRouter from './api/health/insfrastructure/route';
import postsRouter from './api/posts/insfrastructure/routes';
import usersRouter from './api/users/insfrastructure/routes';

import MongoDbClient from './api/shared/insfrastructure/mongoDbClient';

const logger = console;
dotenv.config();

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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app;
