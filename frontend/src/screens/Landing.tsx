import { useNavigate } from 'react-router-dom';
import chessBoardImage from '../assets/chessBoard.jpeg';

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
                    <button type="button" onClick={() => {
                        navigate("/game");
                    }} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">Play Now!</button>
                </div>
            </div>
        </div>
    </div>
}