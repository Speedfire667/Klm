const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Speedfire1237.aternos.me',
  port: 12164,
  username: 'B.Y.T.E'
})

// Lógica para mover o bot em círculos e evitar obstáculos
bot.on('spawn', () => {
  const directions = [
    { x: 1, z: 0 },
    { x: 0, z: 1 },
    { x: -1, z: 0 },
    { x: 0, z: -1 }
  ]
  let dirIndex = 0

  function moveInCircle() {
    const direction = directions[dirIndex]
    const targetPos = bot.entity.position.offset(direction.x, 0, direction.z)
    bot.lookAt(targetPos)
    bot.setControlState('forward', true)

    setTimeout(() => {
      if (bot.blockAt(targetPos).boundingBox === 'block') {
        // Mudar a direção se encontrar um obstáculo
        dirIndex = (dirIndex + 1) % 4
      }
      bot.setControlState('forward', false)
      moveInCircle()
    }, 1000)
  }

  moveInCircle()
})
