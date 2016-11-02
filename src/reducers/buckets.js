import defaultState from "./buckets.json"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'MOVE_DROP':
      let drop = {
        name: action.dropName,
      }
      state.filter((bucket, key) => {
        if (
          (bucket.name === action.bucketName) &&
          (bucket.drops.filter((obj) => obj.name === drop.name).length === 0)
        ) {
          newState[key].drops.push(
            drop
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
