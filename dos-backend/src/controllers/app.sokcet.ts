import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { GameState } from "../models/game.state";
import axios from "axios";
import { PlayParams } from "../models/playParams";
import { Game } from "../models/game";

export function addSocketServer(
  app: express.Express,
  url: string
): http.Server<any, any> {
  const server = http.createServer(app);
  const io = new Server(server, {
    allowEIO3: true,
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("create", (gameState: GameState) => {
      created(socket);
    });
    socket.on("join", (gstate: { gameState: GameState; player_id: string }) => {
      joined(socket, gstate);
    });

    socket.on(
      "play",
      (params: {
        playParams: PlayParams;
        player_id: string;
        game_id: string;
      }) => {
        axios
          .post(
            url + `/game/${params.game_id}/${params.player_id}/play`,
            params.playParams
          )
          .then((res) => {
            updated(socket, params);
          });
      }
    );
  });

  function updated(socket, params) {
    axios
      .get(url + `/game/${params.game_id}`)
      .then((state) => {
        socket.to(params.game_id).emit("update", state.data.game_state);
        socket.emit("update", state.data.game_state);
      })
      .then((res) => {
        axios
          .get(url + `/game/${params.game_id}/${params.player_id}`)
          .then((res) => {
            socket.emit("meupdate", res.data);
          });
      });
  }

  function created(socket) {
    axios.get(url + "/game/new").then((res) => {
      socket.join(res.data.game_id);
      axios.get(url + `/game/${res.data.game_id}`).then((state) => {
        socket.emit("created", state.data.game_state);
      });
    });
  }

  function joined(socket, gstate: { gameState: GameState; player_id: string }) {
    axios
      .get(url + `/game/${gstate.gameState.game_id}/${gstate.player_id}`)
      .then((resp) =>
        resp.data && resp.data.player_id
          ? resp
          : axios.get(url + `/game/${gstate.gameState.game_id}/new`)
      )
      .then((res) => {
        socket.join(gstate.gameState.game_id);
        axios.get(url + `/game/${gstate.gameState.game_id}`).then((state) => {
          socket.emit("mejoined", {
            state: state.data.game_state,
            me: res.data,
          });
          socket
            .to(gstate.gameState.game_id)
            .emit("joined", state.data.game_state);
          socket.emit("joined", state.data.game_state);
        });
      });
  }

  return server;
}
