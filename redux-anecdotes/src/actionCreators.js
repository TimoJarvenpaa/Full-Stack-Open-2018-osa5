const generateId = () => (100000 * Math.random()).toFixed(0)

const actionFor = {
  voteAnecdote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  anecdoteCreation(anecdote) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote,
        id: generateId(),
        votes: 0
      }
    }
  }
}

export default actionFor