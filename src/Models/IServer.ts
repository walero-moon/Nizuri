import { User } from './User';

interface IServer {
  Id: string;
  Users: Record<string, User>;
}

export { IServer };