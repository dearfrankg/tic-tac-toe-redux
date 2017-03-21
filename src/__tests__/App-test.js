import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { shallow, mount } from 'enzyme'
import { getSpecWrapper } from '../utils/unit'
import App, { GameBoard } from '../App'
import game from '../store'
import * as actions from '../store'

const setup = (element) => {
    game.dispatch(actions.resetGame())
    const wrapper = mount(<Provider store={game} ><App /></Provider>)
    return wrapper
}

const clickSequence = (wrapper, sequence) => {
  sequence.forEach(square =>
    getSpecWrapper(wrapper, 'box').at(square).simulate('click')
  )
}

describe('tic-tac-toe', () => {
  describe('render', () => {
    it('should render app', () => {
      render(
        <Provider store={game} >
          <App />
        </Provider>, 
        document.createElement('div')
      )
    })
  })

  describe('the first move', () => {
    it('should render X', () => {
      const wrapper = setup()
      clickSequence(wrapper, [0])
      const actual = getSpecWrapper(wrapper, 'game-board').text()
      const expected = 'X'
      expect(actual).toBe(expected)
    })
  })

  describe('multiple moves', () => {
    it('should alternate between player X and O', () => {
      const wrapper = setup()
      clickSequence(wrapper, [0,1,2,3])
      const actual = getSpecWrapper(wrapper, 'game-board').text()
      const expected = 'XOXO'
      expect(actual).toBe(expected)
    })
  })

  describe('winning the game', () => {
    it('should win with winning combo for Player X', () => {
      const wrapper = setup()
      clickSequence(wrapper, [0,3,1,4,2])
      const actual = getSpecWrapper(wrapper, 'winner').text()
      const expected = 'Player X wins!!'
      expect(actual).toBe(expected)
    })

    it('should win with winning combo for Player O', () => {
      const wrapper = setup()
      clickSequence(wrapper, [0,3,1,4,8,5])
      const actual = getSpecWrapper(wrapper, 'winner').text()
      const expected = 'Player O wins!!'
      expect(actual).toBe(expected)
    })
  })

  describe('new game button', () => {
    it('should clear board and winner', () => {
      const wrapper = setup()
      clickSequence(wrapper, [0,3,1,4,2])
      const hasWinnerAsPlayerX = getSpecWrapper(wrapper, 'winner').text() === 'Player X wins!!'
      expect(hasWinnerAsPlayerX).toBe(true)

      getSpecWrapper(wrapper, 'reset-game').simulate('click')

      const noWinner = getSpecWrapper(wrapper, 'winner').text() === ''
      const noMoves = getSpecWrapper(wrapper, 'game-board').text() === ''
      expect(noWinner).toBe(true)
      expect(noMoves).toBe(true)
    })
  })
})
