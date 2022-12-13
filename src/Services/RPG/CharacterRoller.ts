import { ICharacter } from "../../Models/RPG/ICharacter";
import { ISkill, Proficiency } from "../../Models/RPG/ISkill";
import { ICharacterRoller } from "./ICharacterRoller";

class CharacterRoller implements ICharacterRoller {

  public Character: ICharacter;

  constructor(character: ICharacter) {
    this.Character = character;
  }

  public RollSkill(skill: ISkill): number {
    const skillObj = this.Character.Skills[skill.Name];
    const attribute = this.Character.AbilityScores[skillObj.BaseAbility.Name];
    const proficiency = skillObj.Proficiency;
    
    const dice = Math.floor(Math.random() * 20) + 1;
    const total = dice + attribute.Modifier + 
      CharacterRoller.CalculateProficientyBonus(proficiency, this.Character.Level);

    return total;
  }
      
  private static CalculateProficientyBonus(proficiency: Proficiency, level: number): number {
    const baseProficiencyBonus = Math.floor(2 + (level - 1) / 4);

    switch (proficiency) {
      case Proficiency.NotProficient:
        return 0;
      case Proficiency.HalfProficient:
        return Math.floor(baseProficiencyBonus / 2);
      case Proficiency.Proficient:
        return baseProficiencyBonus;
      case Proficiency.Expertise:
        return baseProficiencyBonus * 2;
    }
  }
}

export { CharacterRoller };