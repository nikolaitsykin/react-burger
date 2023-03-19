export interface IAuthState {
  name: string;
  email: string;
  password: string;
  token: string;
  isAuth: boolean;
}

export interface IFormState {
  [key: string]: string;
}
