import expect from 'expect'
import { gameReducer as reducer, resetGame, handleMove } from '../store'

const initialState = {
  PLAYER1_SYMBOL:  'X',
  PLAYER2_SYMBOL:  'O',
  currentPlayer:  'X',
  winningCombos:  [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ],
  cells:  ['', '', '', '', '', '', '', '', ''],
  winner: ''
}

const isWinnerForEveryWinningCombo = (initialState, playerToTest) => {
  return initialState.winningCombos.reduce((status, combo) => {

    // bail if we already failed
    if (!status) return status

    // setup state to mark the first 2 combo cells
    const state = {
      ...initialState,
      cells: [...initialState.cells],
      currentPlayer: playerToTest
    }
    state.cells[combo[0]] = playerToTest
    state.cells[combo[1]] = playerToTest

    // take action to mark the third combo cell
    const actual = reducer(state, handleMove(combo[2]))

    // define expected state
    const expected = {...state}
    expected.cells[combo[2]] = playerToTest
    expected.currentPlayer = playerToTest === 'X' ? 'O' : 'X'
    expected.winner = playerToTest

    // does actual match expected
    const result = deepEqual(actual, expected)
    return result
  }, true)
}

function deepEqual(a,b) {
  if( (typeof a == 'object' && a != null) &&
      (typeof b == 'object' && b != null) )
  {
     var count = [0,0];
     for( var key in a) count[0]++;
     for( var key in b) count[1]++;
     if( count[0]-count[1] != 0) {return false;}
     for( var key in a)
     {
       if(!(key in b) || !deepEqual(a[key],b[key])) {return false;}
     }
     for( var key in b)
     {
       if(!(key in a) || !deepEqual(b[key],a[key])) {return false;}
     }
     return true;
  } else {
     return a === b;
  }
}


describe('todos reducer', () => {
  describe('empty action', () => {
    it('should return the initial state', () => {
      const actual = reducer(undefined, {})
      const expected = initialState
      expect(actual).toEqual(expected)
    })
  })

  describe('#resetGame', () => {
    it('should restore initial state', () => {
      const state = {
        ...initialState,
        cells: ['X', 'X', '', '', '', '', '', 'O', 'O'],
        currentPlayer: 'O'
      }

      const actual = reducer(state, resetGame())
      const expected = initialState
      expect(actual).toEqual(expected)
    })
  })

  describe('#handleMove', () => {
    it('should mark cell and switch player', () => {
      const state = {
        ...initialState
      }
      const actual = reducer(state, handleMove(0))
      const expected = {
        ...initialState,
        cells: ['X', '', '', '', '', '', '', '', ''],
        currentPlayer: 'O'
      }
      expect(actual).toEqual(expected)
    })

    it('should win on every winning combo for player X', () => {
      const actual = isWinnerForEveryWinningCombo(initialState, 'X')
      const expected = true
      expect(actual).toBe(expected)
    })

    it('should win on every winning combo for player O', () => {
      const actual = isWinnerForEveryWinningCombo(initialState, 'O')
      const expected = true
      expect(actual).toBe(expected)
    })

    it('should not write over the other players move', () => {
      const state = {
        ...initialState,
        cells: ['X', '', '', '', '', '', '', '', ''],
        currentPlayer: 'O'
      }
      const actual = reducer(state, handleMove(0))
      const expected = state
      expect(actual).toEqual(expected)
    })
  })
})
