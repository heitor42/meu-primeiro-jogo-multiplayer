import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({playerId: 'player1', playerX: 9, playerY: 9})
game.addPlayer({playerId: 'player2', playerX: 0, playerY: 0})
game.addPlayer({playerId: 'player3', playerX: 5, playerY: 3})
game.addPlayer({playerId: 'player4', playerX: 0, playerY: 9})
game.addFruit({fruitId: 'fruit1', fruitX: 0, fruitY: 7})
game.addFruit({fruitId: 'fruit2', fruitX: 1, fruitY: 5})
game.addFruit({fruitId: 'fruit3', fruitX: 6, fruitY: 9})

console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`connected on Server with id: ${playerId}`)

    socket.emit('setup', game.state)
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})