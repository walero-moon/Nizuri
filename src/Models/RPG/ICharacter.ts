import { IAbilityScore } from "./IAbilityScore";
import { ISkill } from "./ISkill";

interface ICharacter {
  Id: string;
  Name: string;
  Level: number;
  AbilityScores: Record<string, IAbilityScore>;
  Skills: Record<string, ISkill>;
}

export { ICharacter };