import { Card } from "./card";
export type playCase = "FORBIDDEN" | "BASIC" | "ONE" | "TWO";
export type playType = "EAT" | "BUY" | "END" | "THROW";
export class PlayParams {
  cards: Card[] = [];
  center_card: Card;
  type: playType;
  static play(playParams: PlayParams): playCase {
    let params = new PlayParams();
    params.cards = playParams.cards;
    params.center_card = playParams.center_card;
    params.type = playParams.type;

    if (
      params.type == "EAT" &&
      params.cards.length > 0 &&
      params.cards.length < 3 &&
      params.center_card &&
      params.isSumOk()
    ) {
      let colorOk = params.isColorOk();
      if (!colorOk) return "BASIC";
      if (params.cards.length == 1) return "ONE";
      return "TWO";
    }
    return "FORBIDDEN";
  }
  private isSumOk() {
    let center_is_0 = this.center_card.number == 0;
    let card1_is_0 = this.cards[0].number == 0;
    if (this.cards.length == 2) {
      let card2_is_0 = this.cards[1].number == 0;
      if (center_is_0) return this.cards[0].number + this.cards[1].number <= 10;
      if (card1_is_0) return this.center_card.number >= this.cards[1].number;
      if (card2_is_0) return this.center_card.number >= this.cards[0].number;
      return (
        this.cards[0].number + this.cards[1].number == this.center_card.number
      );
    }
    return (
      center_is_0 ||
      card1_is_0 ||
      this.cards[0].number == this.center_card.number
    );
  }
  private isColorOk() {
    let center_is_2 = this.center_card.number == 2;
    let card1_is_2 = this.cards[0].number == 2;
    if (this.cards.length == 2) {
      let card2_is_2 = this.cards[1].number == 2;
      if (center_is_2)
        return (
          card1_is_2 || card2_is_2 || this.cards[0].color == this.cards[1].color
        );
      if (card1_is_2)
        return card2_is_2 || this.cards[1].color == this.center_card.color;
      if (card2_is_2) return this.cards[0].color == this.center_card.color;
      return (
        this.cards[0].color == this.center_card.color &&
        this.cards[1].color == this.center_card.color
      );
    }
    return (
      center_is_2 || card1_is_2 || this.cards[0].color == this.center_card.color
    );
  }
}
