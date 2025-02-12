import { useNavigate } from 'react-router-dom';
import chessBoardImage from '../assets/chessBoard.jpeg';
import { Button } from '../complonents/Button';

export const Landing = () => {
    const navigate = useNavigate();

    return <div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
                <img src={chessBoardImage} ></img>  
            </div>
            <div>
                <div className='mt-30'>
                    <h1 className='text-5xl text-center leading-15'>
                        CheckMate your opponent in ChessMate
                    </h1>
                </div>
                <div className='mt-15 flex justify-center'>
                    <Button onClick={() => {
                        navigate("/game");
                    }}
                    name='Play Now!'
                    >
                    </Button>
                </div>
            </div>
        </div>
    </div>
}