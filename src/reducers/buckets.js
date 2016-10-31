import defaultState from "./buckets.json"

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE_DROP':
      state.filter((bucket, key) => {
        if (bucket.name === action.bucketName) {
          state[key].drops.push(
            {name: action.dropName}
          )
        }
      })
      break
      default:
    break
  }
  return state
}
