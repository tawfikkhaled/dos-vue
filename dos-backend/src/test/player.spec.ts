import * as supertest from "supertest";
import { server } from "../app";

describe("test game", () => {
  test("should create game", (done) => {
    const requestWithSupertest = supertest(server);
    let req = requestWithSupertest.get("/game/new");
    req.expect(200);
    req.then((res) => {
      console.log("ok");
      let post_req = requestWithSupertest.post(
        "/game/" + res.body.game_id + "/play"
      );
      post_req.send({
        player: "some player",
        cards: [{ number: 7, color: 0 }],
      });
      post_req.expect(200);
      post_req.end(() => done());
    });
  });
});
