import { ICharacter } from "./RPG/ICharacter";
import { IUser } from "./IUser";

class User implements IUser {
  public Id: string;
  Characters: Record<string, ICharacter>;

  constructor(id: string, characters: Record<string, ICharacter>) {
    this.Id = id;
    this.Characters = characters;
  }
}

export { User };