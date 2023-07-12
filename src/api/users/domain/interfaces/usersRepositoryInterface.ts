import { UserData, UserLoginData } from '../entities/user';

export interface UsersRepositoryInterface {
  saveUser(user: UserData): Promise<any>;

  loginUser(userData: UserLoginData): Promise<UserData>;
}
