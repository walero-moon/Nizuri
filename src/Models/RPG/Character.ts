import { IAbilityScore } from "./IAbilityScore";
import { Proficiency, ISkill } from "./ISkill";
import { ICharacter } from "./ICharacter";

class Character implements ICharacter {
  public Id: string;
  public Name: string;
  public Level: number;
  public AbilityScores: Record<string, IAbilityScore>;
  public Skills: Record<string, ISkill>;
  
  constructor(name: string, attributes: Record<string, IAbilityScore>, 
    skills: Record<string, ISkill>, level: number = 1, id?: string) {
      
    this.Name = name;
    this.AbilityScores = attributes;
    this.Skills = skills;
    this.Level = level;
    // make new UUID if not provided
    this.Id = id ?? crypto.randomUUID();
  }
}

export { Character };