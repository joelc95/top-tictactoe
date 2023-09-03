
// IIFE to set up the board and related functions
const gameBoard = (() => {

	let board = ['', '', '',
							 '', '', '',
							 '', '', ''];

	const setGridArea = (index, sign) => {
		board[index] = sign;
	}

	const getGridArea = (index) => {
		return board[index];
	}

	const reset = () => {
		for(let i = 0; i < board.length; i++) {
			board[i] = '';
		}
	}

	return { setGridArea, getGridArea, reset }
})();

const displayController = (() => {
	const gridAreas = Array.from(document.getElementsByClassName('grid-area'))
	console.log(gridAreas)
	gridAreas.forEach(area => {
		area.addEventListener('click', e => {
			console.log(e.target.id)
		})
	})
})();