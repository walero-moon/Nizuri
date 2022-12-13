import { ICharacter } from "../../Models/RPG/ICharacter";
import { ISkill } from "../../Models/RPG/ISkill";

interface ICharacterRoller {
  Character: ICharacter;
  RollSkill(skill: ISkill): number;
}

export { ICharacterRoller };