import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { createStore } from 'redux'

export const resetGame = createAction('reset-game');
export const handleMove = createAction('handle-move');

const initialState = {
  PLAYER1_SYMBOL:  'X',
  PLAYER2_SYMBOL:  'O',
  currentPlayer:  'X',
  winningCombos:  [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ],
  cells:  ['', '', '', '', '', '', '', '', ''],
  winner: ''
}

export const gameReducer = handleActions({
  ['reset-game']: (state, action) => initialState,


  ['handle-move']: (state, action) => {
    const index = action.payload
    const isNoWinner = state.winner === ""
    const isEmptySquare = state.cells[index] === ""
    const switchCurrentPlayer = (state) =>
      state.currentPlayer === state.PLAYER1_SYMBOL ? state.PLAYER2_SYMBOL : state.PLAYER1_SYMBOL

    if (isNoWinner && isEmptySquare) {
      const newCells = state.cells.slice(0)
      newCells[index] = state.currentPlayer
      return {
        ...state,
        cells: newCells,
        currentPlayer: switchCurrentPlayer(state),
        winner: computeWinner({...state, cells: newCells})
      }
    } else {
      return state
    }
  }

}, initialState);


function computeWinner (state) {
  const { PLAYER1_SYMBOL, PLAYER2_SYMBOL, winningCombos, cells } = state
  const winningCombo = (combo, player) => combo.every(_ => cells[_] === player)
  const winner = winningCombos.reduce((winner, combo) => {
    if (winner)
      return winner
    else if (winningCombo(combo, PLAYER1_SYMBOL))
      return PLAYER1_SYMBOL
    else if (winningCombo(combo, PLAYER2_SYMBOL))
      return PLAYER2_SYMBOL
    else
      return ''
  }, '')
  return winner
}

const rootReducer = combineReducers({
  game: gameReducer
})

export default createStore(rootReducer)
