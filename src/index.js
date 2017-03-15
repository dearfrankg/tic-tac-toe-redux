import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import game from './store'

render(
  <Provider store={game}>
    <App/>
  </Provider>,
  document.querySelector('#app')
)
