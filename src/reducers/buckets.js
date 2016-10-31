import defaultState from "./buckets.json"

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH':
      state.push(action.query)
      break
      default:
    break
  }
  return state
}
