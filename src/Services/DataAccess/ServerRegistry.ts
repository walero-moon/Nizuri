import { ObjectId } from 'bson';
import { Collection } from 'mongodb';
import { IServer } from '../../Models/IServer';

class ServerRegistry {
  private _serverCollection: Collection;

  constructor(serverCollection: Collection) {
    this._serverCollection = serverCollection;
  }

  public async GetServer(serverId: string): Promise<IServer> {
    const query = { _id: new ObjectId(serverId) }
    const server = (await this._serverCollection.findOne(query) ?? {}) as IServer;

    return server;
  }

  public async CreateServer(server: IServer): Promise<IServer | null> {
    const result = await this._serverCollection.insertOne(server);
    const createdServer = result.acknowledged ? server : null;

    return createdServer;
  }
}