import { IAbilityScore } from './IAbilityScore';

enum Proficiency {
  NotProficient = 0,
  HalfProficient = 1,
  Proficient = 2,
  Expertise = 3
}

interface ISkill {
  Name: string;
  Proficiency: Proficiency;
  BaseAbility: IAbilityScore;
}

export { ISkill, Proficiency };