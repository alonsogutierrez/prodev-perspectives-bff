export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserData {
  age: number;
  name: string;
  email: string;
  password: string;
  tokens: Array<any>;
}

export interface User extends UserData {
  id: string;
}

export class UserEntity implements User {
  id: string;
  age: number;
  name: string;
  email: string;
  password: string;
  tokens: Array<any>;

  constructor(
    id: string,
    age: number,
    name: string,
    email: string,
    password: string,
    tokens: Array<any>
  ) {
    this.id = id;
    this.age = age;
    this.name = name;
    this.email = email;
    this.password = password;
    this.tokens = tokens;
  }
}
