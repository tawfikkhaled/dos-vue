export class Card {
  number: number;
  color: string;
  constructor(number: number, color: string) {
    this.number = number;
    this.color = color;
  }

  static colors: string[] = ["RED", "GREEN", "YELLOW", "BLUE", "ALL"];
}
