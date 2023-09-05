const Player = (sign) => {
	this.sign = sign;
	const getSign = () => sign;
	return { getSign }
}
// IIFE to set up the board and related functions
const gameBoard = (() => {
	let board = ['', '', '',
							 '', '', '',
							 '', '', ''];

	const setSquare = (index, sign) => {
		board[index] = sign;
		console.log(board)
	}

	const getSquare = (index) => {
		return board[index];
	}

	const resetBoard = () => {
		for(let i = 0; i < board.length; i++) {
			board[i] = '';
		}
	}

	return { setSquare, getSquare, resetBoard }
})();

// IIFE to set up display-related functions
const displayController = (() => {
	const squares = Array.from(document.getElementsByClassName('square'))
	console.log(squares)
	squares.forEach(square => {
		square.addEventListener('click', e => {
			// IF PLAYER's TURN THEN
			// PLAY ROUND
			gameBoard.setSquare(e.target.getAttribute('square'), 'x')
			updateGameBoard();
		})
	})

	const updateGameBoard = () => {
		// ITERATE THRU board ARRAY
		// CHANGE HTML TO DISPLAY IT
		for(let i = 0; i < squares.length; i++) {
			squares[i].textContent = gameBoard.getSquare(i)
		}
	}
})();

// IIFE to set up game-state-related functions
const gameController = (() => {

	const playRound = (index) => {
		// SET GIVEN INDEX TO X OR O
		// CHECK FOR WINS
		// CHECK FOR ROUND 9
	}
})();