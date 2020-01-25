export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10,
        },
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY,
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`)
        
        const acceptedMoves = {
            ArrowLeft(player) {
                console.log('game.movePlayer().ArrowLeft() -> Moving player ArrowLeft')
                if (player.x > 0) {
                    player.x--
                }
            },
            ArrowRight(player) {
                console.log('game.movePlayer().ArrowRight() -> Moving player ArrowRight')
                if (player.x < 9) {
                    player.x++
                }
            },
            ArrowUp(player) {
                console.log('game.movePlayer().ArrowUp() -> Moving player ArrowUp')
                if (player.y > 0) {
                    player.y--
                }
            },
            ArrowDown(player) {
                console.log('game.movePlayer().ArrowDown() -> Moving player ArrowDown')
                if (player.y < 9) {
                    player.y++
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            console.log(`checking ${playerId} and ${fruitId}`)

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId })
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        checkForFruitCollision,
        movePlayer,
        state,
    }
}
