import { Game } from "../models/game";
import { PlayParams, playCase } from "../models/playParams";
import { Player } from "../models/player";
import { MemoryGameService } from "./game-service";

export class GameExecutionService {
  constructor(private gameService: MemoryGameService) {}

  play(
    game_id: string,
    player_id: string,
    playParams: PlayParams
  ): Promise<any> {
    return this.gameService
      .getGame(game_id)
      .then((game) =>
        this.gameService
          .getPlayer(game_id, player_id)
          .then((player) => this.playCase(game, player, playParams))
      );
  }

  eat(
    game: Game,
    player: Player,
    playParams: PlayParams,
    playCase: playCase
  ): void {
    if (playCase != "FORBIDDEN" && playParams.type == "EAT") {
      player.drop(playParams.cards);
      game.dropCenter(playParams.center_card);
      game.last_played_cards = [playParams.center_card].concat(
        playParams.cards
      );
      switch (playCase) {
        case "TWO":
          player.whiteplay += 1;
          this.buyAllBut(game, player);
          break;
        case "ONE":
          player.whiteplay += 1;
          break;
      }
    }
  }
  buy(game: Game, player: Player) {
    let card = game.cards.pop();
    player.cards.push(card);
  }

  buyAllBut(game: Game, player: Player): Promise<void> {
    let players = game.players.filter((p) => p != player.player_id);
    let res = new Promise<void>((resolve, reject) => {
      resolve();
    });
    players.forEach((_player) => {
      res = res.then(() => {
        this.gameService.getPlayer(game.game_id, _player).then((p) => {
          this.buy(game, p);
          return this.gameService.savePlayer(p);
        });
      });
    });

    return res;
  }

  playCase(
    game: Game,
    player: Player,
    playParams: PlayParams
  ): Promise<String> {
    if (game.current_player != player.player_id) {
      return new Promise((resolve, reject) => {
        resolve("player not current player");
      });
    }
    if (game.state == "ENDED") {
      return new Promise((resolve, reject) => {
        resolve("GAME ENDED");
      });
    }
    switch (playParams.type) {
      case "BUY":
        if (player.state == "INITIAL") {
          this.buy(game, player);
          player.state = "PLAYINGAFTERBUY";
        }
        break;
      case "END":
        if (player.state == "PLAYING" && player.whiteplay == 0) {
          player.state = "INITIAL";
          this.nextPlayer(game);
          this.gameService.fixCenter(game);
        }
        break;
      case "THROW":
        if (
          (player.state == "PLAYINGAFTERBUY" || player.whiteplay != 0) &&
          playParams.cards.length == 1
        ) {
          player.state = "PLAYING";
          player.whiteplay -= 1;
          player.whiteplay = player.whiteplay >= 0 ? player.whiteplay : 0;
          player.drop(playParams.cards);
          game.center_cards.push(playParams.cards[0]);
        }
        break;
      case "EAT":
        let playCase = PlayParams.play(playParams);
        if (
          (player.state == "INITIAL" ||
            player.state == "PLAYINGAFTERBUY" ||
            player.state == "PLAYING") &&
          playCase != "FORBIDDEN"
        ) {
          this.eat(game, player, playParams, playCase);
          player.state = "PLAYING";
        }
    }
    if (player.cards.length == 0) {
      game.state = "ENDED";
    }
    return this.gameService
      .saveGame(game)
      .then(() => this.gameService.savePlayer(player))
      .then(() => "OK");
  }

  nextPlayer(game: Game): void {
    let i = game.players.findIndex((p) => p == game.current_player);
    if (i == game.players.length - 1) game.current_player = game.players[0];
    else game.current_player = game.players[i + 1];
  }
}
