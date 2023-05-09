import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { gameRouter } from "./controllers/game-controller";
import { addSocketServer } from "./controllers/app.sokcet";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/game", gameRouter);

const port = 3000;

const server = addSocketServer(app, `http://localhost:${port}`);
if (process.env.NODE_ENV == "production")
  server.listen(port, "0.0.0.0", () => {
    console.log(
      `Example app listening on port ${port} : http://localhost:${port}`
    );
  });

export { server };
