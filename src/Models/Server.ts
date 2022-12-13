import { IServer } from './IServer';
import { User } from './User';

class Server implements IServer {
  public Id: string;
  public Users: Record<string, User>;

  constructor(id: string, users: Record<string, User>) {
    this.Id = id;
    this.Users = users;
  }
}

export { Server };