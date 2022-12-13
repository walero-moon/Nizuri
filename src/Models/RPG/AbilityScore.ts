import { IAbilityScore } from "./IAbilityScore";

class AbilityScore implements IAbilityScore {
  public Name: string;
  public Value: number = 8;

  public Modifier: number = (this.Value - 10) / 2;

  constructor(name: string, value: number = 8) {
    this.Name = name;
    this.Value = value;
  }
}

export { AbilityScore };