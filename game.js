function setup() {
  // Place one-time initialization here. Code in this function
  // will only run once when the page loads (or reloads).
}

function loop() {
  // This function gets called 30 times per second.
}

function onkeydown(key) {
  // Place keyboard-handling code here. This function gets
  // called when keys are pressed.
  
  if (key == keyLeftArrow) {
    player.character.moveLeft()
  }
  else if (key == keyRightArrow) {
    player.character.moveRight()
  }
  else if (key == keySpaceBar) {
    player.character.jump()
  }
}
