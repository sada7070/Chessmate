import { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({board}: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
}) => {
    return <div className="text-gray-800">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    return <div key={j} className={`w-21 h-21 ${(i+j)%2 === 0 ? 'bg-green-500' : 'bg-green-300'}`}>
                        <div className="flex w-full justify-center h-full">
                            <div className="flex h-full justify-center flex-col">
                                {square ? square.type: ""}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}