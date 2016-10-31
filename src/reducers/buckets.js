import defaultState from "./buckets.json"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'MOVE_DROP':
      state.filter((bucket, key) => {
        if (bucket.name === action.bucketName) {
          newState[key].drops.push(
            {name: action.dropName}
          )
        }
      })
      return newState
      break
      default:
    break
  }
  return state
}
