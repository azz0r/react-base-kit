import defaultState from "./buckets.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'MOVE_DROP_TO_BUCKET':

      let drop = {
        name: action.dropName,
      }

      let isInBucket = (bucket) => {
        return bucket.drops.filter((obj) => obj.name === action.dropName).length > 0
      }

      state.filter((bucket, key) => {
        let isInBucketValue = isInBucket(bucket)
        if (bucket.name === action.bucketName && !isInBucketValue) {
          newState[key].drops.push(drop)
        } else if (isInBucketValue) {
          newState[key].drops = newState[key].drops.filter((drop) => drop.name !== action.dropName)[0]
        }
      })
      return newState
      break
      default:
    break
  }
  return state
}
