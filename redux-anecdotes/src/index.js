import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './anecdoteReducer'

ReactDOM.render(
  <Provider store={createStore(anecdoteReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)