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

	// Get and Set functions so we don't directly mutate board
	const setSquare = (index, sign) => {
		board[index] = sign;
		console.log(board)
	}

	const getSquare = (index) => {
		return board[index];
	}

	// Clear board
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
	const playerScoreText = document.getElementById('player-score')
	const aiScoreText = document.getElementById('ai-score');
	squares.forEach(square => {
		square.addEventListener('click', e => {
			// IF PLAYER's TURN THEN
			if(gameController.playerTurn) {
				// PLAY ROUND
				gameController.playRound(e.target.getAttribute('square'))
				updateGameBoard();
			}
		})
	})

	const updateGameBoard = () => {
		// ITERATE THRU board ARRAY
		// CHANGE HTML TO DISPLAY IT
		for(let i = 0; i < squares.length; i++) {
			squares[i].textContent = gameBoard.getSquare(i)
		}
	}

	const updateScoreline = () => {
		playerScoreText.innerText = gameController.playerScore;
		aiScoreText.innerText = gameController.aiScore;
	}

	return { updateScoreline }

})();

// IIFE to set up game-state-related functions
const gameController = (() => {
	const player = Player("X");
	const ai = Player("O");
	let round = 1;
	let isOver = false;
	let playerScore = 0;
	let aiScore = 0;
	let playerTurn = true;
	
	const playRound = (index) => {
		// CHECK FOR ROUND 9
		if(round === 9) { 
			gameOver() 
		}
		round++;
		// SET GIVEN INDEX TO X OR O
		if(playerTurn) {
			gameBoard.setSquare(index, player.getSign())
		} else {
			gameBoard.setSquare(index, ai.getSign())
		}
		// NEXT PLAYER TURN
		playerTurn = !playerTurn
	}

	const gameOver = () => {
		round = 1;
		//check for win

		//update score as needed
		displayController.updateScoreline();
		//else display draw message

		//reset the board
		gameBoard.resetBoard();
	}

	return { playRound, playerScore, aiScore, playerTurn }
})();