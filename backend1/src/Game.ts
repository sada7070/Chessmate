// class to initalize new Game
/*
    Game {
        player1,
        player2,
        board,
        moves([]),
        startTime
    }
*/

import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;                                // from chess.js
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();                       // init new chess variable
        this.startTime = new Date();
        this.player1.send(JSON.stringify({              // assignin colors to the players
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        // validate the type of move using zod

        // if other player try to move when it is not their turn
        if(this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if(this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }

        try{
            this.board.move(move);
        } catch(e) {
            console.log(e);
            return;
        }

        // after the move, if game is over send the message to both playerts
        /*
        The payload contains the winner:
        this.board.turn() returns the player who is supposed to move next ("w" for white, "b" for black).
        If it's "w", it means Black made the last move and won.
        If it's "b", it means White made the last move and won.
=        */
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === "w" ? "black" : "white";
            const message = JSON.stringify({
                type: GAME_OVER,
                payload: { winner }
            });
        
            this.player1.emit(message);
            this.player2.emit(message);
            return;
        }
        
        // if the game is not over, tell the other player a move is made
        if(this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
        this.moveCount++;
    }
}