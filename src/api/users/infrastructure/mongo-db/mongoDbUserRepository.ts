import { UserData, UserLoginData } from '../../domain/entities/user';
import { UsersRepositoryInterface } from '../../domain/interfaces/usersRepositoryInterface';
import { User } from './models/userSchema';

const logger = console;

class MongoDbUserRepository implements UsersRepositoryInterface {
  async saveUser(userData: UserData): Promise<any> {
    const user = new User(userData);
    await user.save();
    logger.info('USER DOCUMENT WELL SAVED INTO DB');
  }

  async loginUser(userData: UserLoginData): Promise<any> {
    const user = await User.findByCredentials(
      userData.email,
      userData.password
    );
    const token = await user?.generateAuthToken();
    logger.log('USER LOGGED IN');
    return { user, token };
  }
}

export default MongoDbUserRepository;
