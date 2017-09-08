var map = []

var characterTemplates = {
  P: {
    standing: 'images/characters/player-standing.png',
    walking: 'images/characters/player-walking.png',
    dazed: 'images/characters/player-dazed.png',
    image: null,
    isFacingRight: true,
    position: {
      left: null,
      top: null,
      jump: null,
      topjump: null
    },
    isWalking: false,
    isJumping: false,
    jump: function() {
      // Make the character jump, if there is empty space above.
      var character = this
      var x = character.position.left
      var y = character.position.top - 1
      if (!character.isJumping && !map[x][y]) {
        character.position.jump = 0
        character.position.topjump = character.position.top
        character.isJumping = true
      }
    },
    moveRight: function() {
      // Move character to the right but only if there are no obstacles.
      var character = this
      if (!character.isFacingRight) {
        character.isFacingRight = true
        character.image.style.transform = ""
      }
      else {
        var x = character.position.left + 1
        var y = character.position.top
        if (!character.isWalking && !map[x][y]) {
          character.isWalking = true
        }
      }
    },
    moveLeft: function() {
      // Move character to the left but only if there are no obstacles.
      var character = this
      if (character.isFacingRight) {
        character.isFacingRight = false
        character.image.style.transform = "rotatey(180deg)"
      }
      else {
        var x = character.position.left - 1
        var y = character.position.top
        if (!character.isWalking && !map[x][y]) {
          character.isWalking = true
        }
      }
    },
    loop: function() {
      var character = this
      
      if (character.isWalking) {
        if (character.image.src.indexOf(character.walking) !== -1) {
          character.image.src = character.standing
        }
        else {
          character.image.src = character.walking
        }
    
        if (character.isFacingRight) {
          character.position.left += 0.25
        }
        else {
          character.position.left -= 0.25
        }
    
        character.image.style.left = character.position.left * 16
        character.image.style.top = character.position.top * 16
    
        if (character.position.left == Math.floor(character.position.left)) {
          character.isWalking = false
        }
      }
    
      if (character.isJumping) {
        character.image.src = character.walking
        character.position.jump += Math.PI / 8
        character.position.top = character.position.topjump - Math.sin(character.position.jump)
    
        character.image.style.left = character.position.left * 16
        character.image.style.top = character.position.top * 16
    
        if (character.position.jump >= Math.PI) {
          character.isJumping = false
          character.position.top = character.position.topjump
          character.image.src = character.standing
        }
      }
    }
  }
}

var characters = {
}

var player = {
  character: null
}

var keyRightArrow = '39'
var keyLeftArrow = '37'
var keyUpArrow = '38'
var keyDownArrow = '40'
var keySpaceBar = '32'

document.addEventListener("DOMContentLoaded", function() {

  var level = document.getElementById("level").innerHTML

  var x = 0
  var y = 0
  for (var i = 0; i < level.length; i++) {
      var c = level.charAt(i);
      
      if (c == '\n' || c == '\r') {
        x = 0
        if (i > 0) y++
        continue
      }
      
      var tileimagesrc = tiles[c]
      if (tileimagesrc) {
        if (!map[x]) map[x] = []
        if (c != ' ') map[x][y] = c
      
        var image = document.createElement("img")
        image.src = tileimagesrc
        image.setAttribute('class', 'tile')
        image.setAttribute('style', 'left: ' + x * 16 + 'px; top: ' + y * 16 + 'px')
      
        document.getElementById("platforms").appendChild(image)
      }
      
      var characterTemplate = characterTemplates[c]
      if (characterTemplate) {
        var image = document.createElement("img")
        image.src = characterTemplate.standing
        image.setAttribute('class', 'character')
        image.setAttribute('style', 'left: ' + x * 16 + 'px; top: ' + y * 16 + 'px')
      
        document.getElementById("characters").appendChild(image)
        
        characters[c] = characterTemplate
        characters[c].image = image
        characters[c].position = {
          left: x,
          top: y
        }
        
        if (c == 'P') {
          player.character = characters[c]
        }
      }
      
      x++
  }
  
  document.body.onkeydown = function(e) {
    var keyCode = (window.event) ? event.keyCode : e.which
    
    if (onkeydown) {
      onkeydown(keyCode)
    }
    
    return false
  }
  
  var timer = setInterval(onTimer, 1000 / 30)

  function onTimer() {
    for (var i in characters) {
      var character = characters[i]
      character.loop()
    }
    
    loop()
  }
  
})
