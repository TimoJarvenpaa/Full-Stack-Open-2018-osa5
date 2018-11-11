const actionFor = {
  voteAnecdote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  
}

export default actionFor