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
	}
	const getSquare = (index) => {
		return board[index];
	}

	// Clear board array and update UI to blank state
	const resetBoard = () => {
		for(let i = 0; i < board.length; i++) {
			board[i] = '';
		}
		displayController.updateGameBoard();
	}

	return { board, setSquare, getSquare, resetBoard }
})();

// IIFE to set up display-related functions
const displayController = (() => {
	const squares = Array.from(document.getElementsByClassName('square'))
	const playerScoreText = document.getElementById('player-score')
	const aiScoreText = document.getElementById('ai-score');
	const resetButton = document.getElementById('reset-button')

	// Iterate through all square elements
	squares.forEach(square => {
		// Add an event listener to each square
		square.addEventListener('click', e => {
			// IF PLAYER's TURN THEN
			if(gameController.playerTurn) {
				// PLAY ROUND FOR X
				gameController.playRound(e.target.getAttribute('square'))
				updateGameBoard();
			}
		})
	})

	resetButton.addEventListener('click', () => {
		gameBoard.resetBoard();
		updateGameBoard();
	})

	const updateGameBoard = () => {
		// ITERATE THRU board ARRAY
		// CHANGE HTML TO DISPLAY IT
		for(let i = 0; i < squares.length; i++) {
			squares[i].textContent = gameBoard.getSquare(i)
			if(squares[i].textContent != '') {
				squares[i].classList.remove('free')
			}
		}
	}

	const updateScoreline = () => {
		playerScoreText.innerText = gameController.playerScore;
		aiScoreText.innerText = gameController.aiScore;
	}

	return { updateScoreline, updateGameBoard }

})();

// IIFE to set up game-state-related functions
const gameController = (() => {
	const player = Player("X");
	const ai = Player("O");
	// Initiate first game state:
	let round = 1;
	let isOver = false;
	let playerTurn = true;

	if(!playerTurn) {
		setTimeout(() => {
			aiMove()
		}, 1500)
	}
	
	// Play a round when a square is selected by Human
	const playRound = (index) => {
		// SET GIVEN INDEX TO X OR O
		if(round === 9) { 
			gameOver() 
		}
		round++;
		
		if(playerTurn) {
			humanMove(index)
			setTimeout(() => {
				aiMove()
			}, 1500)
		}
		// CHECK FOR ROUND 9
	}

	// Take selected square to play human move
	const humanMove = (index) => {
		// If space is free, mark it with 'X'
		if(gameBoard.board[index] === '') {
			gameBoard.setSquare(index, player.getSign())
			playerTurn = !playerTurn
		}
	}

	// Randomly select a free space for the ai move
	const aiMove = () => {
		// This returns an array of free spaces
		if(gameBoard.board.filter((e) => e === '').length==0){
			return
		}
		// Roll random number 0-8
		// if square is not free, re-roll
		let n = Math.floor(Math.random()*8)
		while(gameBoard.board[n]!=='') {
			n = Math.floor(Math.random()*8)
		} 
		// Make move with valid n value
		gameBoard.setSquare(n, ai.getSign())
		// Update UI
		displayController.updateGameBoard()
		playerTurn = !playerTurn
	}

	const gameOver = () => {
		//Check for Wins on final move

		//Update score if win
		displayController.updateScoreline();
		
		// Display game result message

		// Game Over state is true
		isOver = true;
	}

	return { playRound, playerTurn }
})();