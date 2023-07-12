import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import { User } from '../users/insfrastructure/mongo-db/models/userSchema';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_EXPIRATION_HOURS: string = process.env.JWT_EXPIRATION_HOURS!;

export function generateToken(userId: string): string {
  const payload = { userId };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_HOURS,
  });
  return token;
}

export function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers.authorization?.replace('Bearer ', '')!;
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({
      _id: decodedToken._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Invalid request');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
