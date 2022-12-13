import { IAbilityScore } from './IAbilityScore';
import { ISkill, Proficiency } from './ISkill';

class Skill implements ISkill {
  public Name: string;
  public Proficiency: Proficiency;
  public BaseAbility: IAbilityScore;

  constructor(name: string, baseAttribute: IAbilityScore, 
    proficiency: Proficiency = Proficiency.NotProficient) {

    this.Name = name;
    this.BaseAbility = baseAttribute;
    this.Proficiency = proficiency;
  }
}

export { Skill, Proficiency };