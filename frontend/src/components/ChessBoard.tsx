import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({board, socket, setBoard, chess}: {
    setBoard: any;
    chess: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {

    const[from, setFrom] = useState<Square | null>(null);

    return <div className="text-gray-800">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRespresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;

                    return <div onClick={() => {
                        if(!from) {
                            setFrom(squareRespresentation);
                        } else {
                            socket.send(JSON.stringify({
                                type: MOVE,
                                payload: {
                                    move: {
                                        from,
                                        to: squareRespresentation
                                    }
                                }
                            }));
                            setFrom(null);
                            chess.move({
                                from,
                                to: squareRespresentation
                            });
                            setBoard(chess.board());
                        }
                    }} key={j} className={`w-21 h-21 ${(i+j)%2 === 0 ? 'bg-green-500' : 'bg-green-300'}`}>
                        <div className="flex w-full justify-center h-full">
                            <div className="flex h-full justify-center flex-col">
                                {square ? <img className="w-12" src={`/${square?.color === "b" ?
                                square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> :
                                null}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}