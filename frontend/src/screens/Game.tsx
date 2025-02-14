import { useEffect, useState } from "react";
import { Button } from "../complonents/Button"
import { ChessBoard } from "../complonents/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from 'chess.js'

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    // useEffect to setboard 
    useEffect(() => {
        if(!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("Game Initialized.");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move made.");
                    break;
                case GAME_OVER:
                    console.log("Game Over.");
                    break;
            }
        }
    }, [socket]);

    if(!socket) {
        return <div>
            Connectng ...
        </div>
    }

    return <div className="flex justify-center">
        <div className="py-7 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-50">

                <div className="col-span-4 flex justify-center">
                    <ChessBoard board={board} />
                </div>

                <div className="col-span-2 flex justify-center">
                    <div className="flex h-full justify-center flex-col">
                        <Button onClick={() => {
                            socket.send(JSON.stringify({
                                type: INIT_GAME
                            }));
                        }} name="Start!" />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}