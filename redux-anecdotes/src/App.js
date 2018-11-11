import React from 'react';
import AnecdoteList from './components/AnecdoteList';


class App extends React.Component {
  render() {
    return (
      <div>
        <AnecdoteList />
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App