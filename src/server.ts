import dotenv from 'dotenv';
import app from './app';

const logger = console;
dotenv.config();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
