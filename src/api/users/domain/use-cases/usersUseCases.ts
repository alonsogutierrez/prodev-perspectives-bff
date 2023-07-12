import { UsersRepositoryInterface } from '../interfaces/usersRepositoryInterface';
import { UserData, UserLoginData } from '../entities/user';

const logger = console;

class UsersUseCases {
  constructor(private usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository;
  }

  async saveUser(userData: UserData): Promise<UserData | null> {
    try {
      const user: UserData = await this.usersRepository.saveUser(userData);
      return user;
    } catch (error) {
      const message: string = 'Error trying to save user';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  async loginUser(userLoginData: UserLoginData): Promise<UserData> {
    try {
      const user: UserData = await this.usersRepository.loginUser(
        userLoginData
      );
      return user;
    } catch (error) {
      const message: string = 'Error trying to login user';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }
}

export default UsersUseCases;
