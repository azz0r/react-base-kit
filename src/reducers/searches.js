export default (state = [], action) => {
  switch (action.type) {
    case 'SEARCH':
      state.push(action.query)
      break
      default:
    break
  }
  return state
}
