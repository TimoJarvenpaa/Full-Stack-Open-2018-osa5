import React from 'react'
import actionFor from '../actionCreators'
import PropTypes from 'prop-types'


class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  
  addAnecdote = (event) => {
    event.preventDefault()
    this.context.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm