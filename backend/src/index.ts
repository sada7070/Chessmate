import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
    // whenever a new user connects add them to gamemanager array
    gameManager.addUser(ws);

    wss.on("disconnect", () => gameManager.removeUser(ws));
});