import app from './src/app/index.mjs'
import http from 'http'

const server = http.createServer(app)
const port = 3000

console.log("============================")
console.log("trying to running server ...")
server.listen(port)
console.log(`server running on port: ${port}`)
console.log("============================")
