import express, { Request, Response } from 'express';
import { UserData, UserLoginData } from '../domain/entities/user';
import UsersUseCases from '../domain/use-cases/usersUseCases';
import MongoDbPostRepository from './mongo-db/mongoDbPostRepository';
import { auth } from './../../shared/auth_middleware';

const usersRouter = express.Router();

// GET User login
usersRouter.get('/users/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userLoginData: UserLoginData = { email, password };
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const usersUseCases: UsersUseCases = new UsersUseCases(postRepository);
    const user: UserData | null = await usersUseCases.loginUser(userLoginData);

    res.send(user);
  } catch (error: any) {
    res.status(500).send({
      error: `Cant login user, internal error: ${error.message}`,
    });
  }
});

// POST Post
usersRouter.post('/users', auth, async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const usersUseCases: UsersUseCases = new UsersUseCases(userRepository);
    const user: UserData | null = await usersUseCases.saveUser(userData);

    res.send(user);
  } catch (error: any) {
    res.status(500).send({
      error: `Cant save user, internal error: ${error.message}`,
    });
  }
});

export default usersRouter;
