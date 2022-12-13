import { ICharacter } from "./RPG/ICharacter";

interface IUser {
  Id: string;
  Characters: Record<string, ICharacter>;
}

export { IUser };