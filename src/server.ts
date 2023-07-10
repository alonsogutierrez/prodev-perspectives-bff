import express from 'express';

import healthRouter from './api/health/insfrastructure/route';
import postsRouter from './api/posts/insfrastructure/routes';

const app = express();

app.use(healthRouter);
app.use(postsRouter);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
