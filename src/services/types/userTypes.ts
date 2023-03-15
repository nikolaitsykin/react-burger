export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  isAuth?: boolean;
  token?: string;
}

export interface IFormUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserResponse {
  success: boolean;
  message?: string;
  user?: IUser;
  accessToken: string;
  refreshToken?: string;
  data: IUserResponse;
}
