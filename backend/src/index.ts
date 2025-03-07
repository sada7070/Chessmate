require('dotenv').config()

import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: Number(process.env.PORT) });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
    // whenever a new user connects add them to gamemanager array
    gameManager.addUser(ws);

    wss.on("disconnect", () => gameManager.removeUser(ws));
});