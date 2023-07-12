import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const logger = console;

const MONGO_DB_USER: string = process.env.MONGO_DB_USER!;
const MONGO_DB_PASSWORD: string = process.env.MONGO_DB_PASSWORD!;
const MONGO_DB_HOST: string = process.env.MONGO_DB_HOST!;
const MONGO_DB_NAME: string = process.env.MONGO_DB_NAME!;
const uri: string = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

class MongoDbClient {
  async connectDB() {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      logger.info('Well connected with MongoDB');
    } catch (error) {
      const message: string = 'Error connecting with MongoDB';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }
}

export default MongoDbClient;
