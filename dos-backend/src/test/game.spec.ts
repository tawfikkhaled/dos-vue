import * as supertest from "supertest";
import { server } from "../app";
import { getGameService } from "../services/game-service";
import { Game } from "../models/game";
import { Card } from "../models/card";
const service = getGameService(process.env.NODE_ENV);
describe("test game", () => {
  test("should create game", (done) => {
    const requestWithSupertest = supertest(server);
    let req = requestWithSupertest.get("/game/new");
    req.expect(200);
    req.then((res) => {
      let game = res.body as Game;

      reorderGameAndSave(game)
        .then(() => {
          return addPlayers(game, requestWithSupertest, 2);
        })
        .then(() => {
          let req2 = requestWithSupertest.get("/game/new");
          req2.expect(200);
          req2.then(() => {
            testFirstPlay(game, requestWithSupertest).then(() => done());
          });
        });
    });
  });
});
function testFirstPlay(
  game: Game,
  requestWithSupertest: supertest.SuperTest<supertest.Test>
) {
  let post_req = requestWithSupertest.post(
    `/game/${game.game_id}/${game.current_player}/play`
  );
  post_req.send({
    player: "some player",
    cards: [{ number: 7, color: 0 }],
    center_card: { number: 7, color: 0 },
    type: "EAT",
  });
  post_req.expect(200);
  return post_req;
}
function reorderGameAndSave(game: Game) {
  game.cards.sort(
    (a, b) =>
      a.number +
      Card.colors.indexOf(a.color) -
      b.number +
      Card.colors.indexOf(b.color)
  );
  return service.saveGame(game);
}
function addPlayers(
  game: Game,
  requestWithSupertest: supertest.SuperTest<supertest.Test>,
  nbPlayers
) {
  var res = new Promise<void>((resolve, reject) => resolve());
  for (let i = 0; i < nbPlayers; i++) {
    res.then(() => {
      return addPlayer(game, requestWithSupertest);
    });
    return res;
  }
}

function addPlayer(
  game: Game,
  requestWithSupertest: supertest.SuperTest<supertest.Test>
) {
  let req = requestWithSupertest.get(`/game/${game.game_id}/new`);
  req.expect(200);
  return req;
}
