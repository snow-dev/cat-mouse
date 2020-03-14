import React, {useEffect, useState} from 'react';
import Cell from './Cell';

import cat from './cat.jpg';
import rat from './rat.png';

const Game = () => {
	
	// _> This represent the current player.
	// 0 -> Cat
	// 1 -> Rat
	const [activeTurn, setActiveTurn] = useState(null);
	
	// _> State representing game winner.
	const [gameOver, setGameOver] = useState({turn: null, over: false});
	
	
	/* Board represent the current board state, initially it is empty,
	but through game it is updated for reflect the current game state. */
	const [board, setBoard] = useState(
		[
			[-1, -1, -1],
			[-1, -1, -1],
			[-1, -1, -1],
		]
	);
	
	/**
	 * This useEffect will initialize randomly player turn.
	 * We use a pseudo aleatory Math.random for choose the turn.
	 * 0 -> Cat
	 * 1 -> Rat
	 */
	useEffect(() => {
		let turn = Math.random() < 0.5 ? 0 : 1;
		setActiveTurn({ turn })
	}, []);
	
	
	/**
	 * Handler for update board, here we take care of a few things:
	 * 1. We check which turn is active Cat or Rat, if is cat (0), we set
	 *  a 0 value on that board position, else we put 1.
	 * 2. After each player turn, we switch activeTurn,
	 *  for allow second player to play
	 * @param cellPosition -> Represent position on board array for clicked cell.
	 */
	const onClickCellHandler = (cellPosition) => {
		if (activeTurn.turn === 0) {
			setActiveTurn({turn: 1});
			setBoard([...board], board[ cellPosition[0] ][ cellPosition[1] ] = 0);
		} else {
			setActiveTurn({turn: 0});
			setBoard([...board], board[ cellPosition[0] ][ cellPosition[1] ] = 1);
		}
		// After each movement check game status.
		checkGameStatus();
	};
	
	/**
	 * The idea is check after each turn if there are a winner or not.
	 */
	const checkGameStatus = () => {
		console.debug("State of current board: ", board );
		// Check for rows.
		for(let i = 0; i <= 2;  i++) {
			// console.debug("State in row: ",i + ' -> ' + board[i][0], board[i][1], board[i][2] );
			let rowSum = board[i][0] + board[i][1] + board[i][2];
			if (rowSum === 3 || rowSum === 0){
				console.debug("checkGameStatus: We have a winner on row: ", i + '-> rowSum = ' + rowSum);
				// setGameOver({activeTurn, over: true});
			}
		}
		
		// Check for columns.
		let kernel = [[1, 1, 1], [0, 0, 0]];
		for(let k = 0; k <= 2;  k++) {
			let column = [board[0][k], board[1][k], board[2][k]];
			console.debug("Kernel 0:  -> ", kernel[0] );
			console.debug("Column: ",k + ' -> ', column );
			console.debug("Column in kernel: ",k + ' -> ', column ===  kernel[0] );
		}
	};
	
	/**
	 * This method update board cells status, it generate an empty board,
	 * then we iterate through state board positions checking value for each one,
	 * for those different from -1, we set the correspondent props to cell.
	 * and set Cell component on boardUpdated array for current position.
	 * @returns {null[][]}
	 */
	const drawBoard = () => {
		let boardUpdated = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		
		for (let i = 0; i <= 2; i++ ) {
			for (let j = 0; j <= 2; j++ ) {
				if (board[i][j]  === 0 ) {
					boardUpdated[i][j] = <Cell image              ={cat}
					                           coordinates        ={[i, j]}
					                           type               ={board[i][j]}
					                           onClickCellHandler ={onClickCellHandler}
					                           gameOver            ={gameOver.over}
					/>;
				} else if (board[i][j]  === 1 ){
					boardUpdated[i][j] = <Cell image              ={rat}
					                           coordinates        ={[i, j]}
					                           type               ={board[i][j]}
					                           onClickCellHandler ={onClickCellHandler}
					                           gameOver            ={gameOver.over}
					/>;
				} else {
					boardUpdated[i][j] = <Cell image               ={null}
					                           coordinates         ={[i, j]}
					                           type                ={board[i][j]}
					                           onClickCellHandler  ={onClickCellHandler}
					                           gameOver            ={gameOver.over}
					/>;
				}
			}
		}
		return boardUpdated;
	};
	
	return (
		
		<div className="board">
			
			{
				drawBoard()
			}
			
			{
				gameOver.over === true ?
					<h2> There is a winner, urra!</h2>
					:
					null
			}
		
		</div>
	)
};

export default Game;