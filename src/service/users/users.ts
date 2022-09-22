export interface IUserState {
  users: IUsers[];
}

export interface IUsers {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface IUsersPayload extends IPayLoad {
  users?: any;
}

export interface IPayLoad {
  payload?: any;
}

export interface Action<T extends IPayLoad> {
  type: string;
  payload?: T;
}
