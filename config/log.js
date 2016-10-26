import debug from 'debug'

const log = debug('app:start')
const error = debug('app:error')
const exit = debug('app:exit')
const build = debug('app:build')

export { log, error, exit, build }
