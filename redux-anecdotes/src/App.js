import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'


class App extends React.Component {
  render() {
    return (
      <div>
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App