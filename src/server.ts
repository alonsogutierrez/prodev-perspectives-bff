import express from 'express';
import dotenv from 'dotenv';

import healthRouter from './api/health/insfrastructure/route';
import postsRouter from './api/posts/insfrastructure/routes';

import MongoDbClient from './api/shared/insfrastructure/mongoDbClient';

dotenv.config();

const app = express();
const logger = console;

try {
  const mongoDBRepo: MongoDbClient = new MongoDbClient();
  mongoDBRepo.connectDB();
} catch (err: any) {
  throw new Error(`Error connecting with MongoDB: ${err?.message}`);
}

app.use(healthRouter);
app.use(postsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app;
