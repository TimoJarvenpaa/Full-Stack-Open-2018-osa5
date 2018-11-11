import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'
import Anecdote from './Anecdote'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addVote = (id) => () => {
    this.context.store.dispatch(
      actionFor.voteAnecdote(id)
    )
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.context.store.getState().map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={this.addVote(anecdote.id)}
          />)}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList