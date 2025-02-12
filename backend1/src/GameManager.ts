import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";


export class GameManager {
    private games: Game[];                       // to store all games
    private pendingUser: WebSocket | null;       // user who is waiting for matching(null is when no one waiting)
    private users: WebSocket[]                   // array of users

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }  

    removeUser(socket: WebSocket) {
        // stop the game here because the user left
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            // to create new game
            if(message.type === INIT_GAME) {
                if(this.pendingUser) {
                    // if there is a player waiting already then start a new game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            }

            if(message.type == MOVE) {
                // when a player makes move, we have to find the game they are playing from games[]
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    // if the game exists then that specific user(socket) make move
                    game.makeMove(socket,message.move);
                }
            }
        });
    }
}