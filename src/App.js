import React from 'react'
import { Flex } from 'reflexbox'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store'


@injectSheet(styles())
class GameBoard extends React.Component {
  static propTypes = {
    game: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }

  render = () => {
    const { game, actions, classes } = this.props
    return (
      <Flex 
        data-spec='game-board' 
        className={classes.gameBoard} 
        style={{boxSizing: 'unset'}} 
        align='flex-start' 
        wrap 
      >
        { game.cells.map((cell, i) =>
          <div key={i} onClick={() => actions.handleMove(i)} data-spec='box' >
            <Flex className={classes.box} align='center' justify='center' >
              <span>{cell}</span>
            </Flex>
          </div>
        )}
      </Flex>
    )
  }
}

@injectSheet(styles())
@connect(
  state => ({         // mapStateToProps
    game: state.game
  }),
  dispatch => ({      // mapDispatchToProps
    actions: bindActionCreators(actions, dispatch)
  })
)
export default class App extends React.Component {
  static propTypes = {
    game: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }

  render () {
    const {classes, game, actions} = this.props
    return (
      <div className='app'>
        <header style={{textAlign: 'center'}}>
          <h1>Tic Tac Toe</h1>
        </header>

        <GameBoard game={game} actions={actions} />

        <footer style={{textAlign: 'center'}}>
          <h2 data-spec='winner' >{game.winner && `Player ${game.winner} wins!!`}</h2>
          <button data-spec='reset-game' onClick={actions.resetGame}>New Game</button>
        </footer>
      </div>
    )
  }
}

function styles() {
  return {
    gameBoard: {
      width: 450,
      height: 450,
      border: '4px solid black',
      backgroundColor: 'limegreen',
      margin: '30px auto 0 auto',
    },
    box: {
      width: 150,
      height: 150,
      boxSizing: 'border-box',
      border: '4px solid black',
      fontSize: 100,
      cursor: 'pointer',
    }
  }
}
