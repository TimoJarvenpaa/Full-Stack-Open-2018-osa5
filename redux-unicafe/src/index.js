import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const Statistiikka = () => {
  const state = store.getState()

  const palautteita = state.good + state.ok + state.bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{((state.good - state.bad)/palautteita).toFixed(1)}</td>
          </tr>
          <tr>
            <td>hyviä</td>
            <td>{100 * (state.good / palautteita).toFixed(1)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)