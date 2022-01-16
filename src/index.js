import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom/cjs/react-dom.development';
import './index.css';
import * as serviceWorker from './serviceWorker';



const Square=properties=>{
    return(
        <button 
            className="square"
            onClick={properties.onClickEvent}
            >
            {properties.value}
        </button>
    )
}


const Board=()=>{
    const initialSquare=Array(9).fill(null)
    const [square,setSquare]=useState(initialSquare)
    const [xIsNext,setXIsNext]=useState(true);



    const handleClickEvent=(i)=>{
        // alert(`Square ${i} clicked`);
        //make a copy of square state array
        const copySquare=[...square]

        const winnerDeclared=Boolean(calculateWinner(copySquare));
        const squareFilled=Boolean(copySquare[i]);
        if(winnerDeclared || squareFilled){
            return;
        }

        //Mutate the copy, setting the i-th element to 'X'
        copySquare[i]=xIsNext ? 'X' : 'O';
        //call the setSquare function with the mutated copy
        setSquare(copySquare)
        setXIsNext(!xIsNext)
    }

    const renderSquare=(i)=>{
        return(
            <Square 
                value={square[i]}
                onClickEvent={()=>handleClickEvent(i)}
                />
        )
    }

    const winner=calculateWinner(square);
    // const winner=true;
    const status=winner ?
     `Winner: ${winner}` :   
    `Next Player: ${xIsNext ? "X" : "O"}`;

    return(
        <div style={{
            backgroundColor:"yellowgreen",
            margin:10,
            padding:20     
        }}>
            {status}
            <div className='board-row'>
                {renderSquare(0)}{renderSquare(1)} {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}{renderSquare(4)} {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}{renderSquare(7)} {renderSquare(8)}
            </div>
    
        </div>
    )
}


const Game=()=>{
    return(
        <div className="game">
            Tic-Tac-Toe
            <Board/>
        </div>

    )
}

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(square){
    const lines=[
        [0,1,2],[3,4,5],[6,7,8],//Horizonal
        [0,3,6],[1,4,7],[2,5,8],//Vertical
        [0,4,8],[2,4,6]//Diagonal
    ]
    for (let line of lines){
        // console.log(typeof(line))
        const [a,b,c]=line;

        if(square[a] && square[a] === square[b] && square[a] === square[c]){
            return square[a]//X or O
        }
    }
    return null

}




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


