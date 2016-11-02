import * as types from './types'

export function moveDrop(bucketName, dropName) {
  return {
    type: types.MOVE_DROP_TO_BUCKET,
    bucketName,
    dropName,
  }
}