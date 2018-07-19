
var playerPiece;

var gameArea = {
    canvas: document.createElement("canvas"),
    start : function() {
      this.canvas.width = 900;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[2]);
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function(e) {
        gameArea.keys = (gameArea.keys || []);
        gameArea.keys[e.keyCode] = true;
      })
      // This throws an errorif you refresh with f5 but it is fine.
      // It occurs because the array has not yet been initialised at
      // the time of the f5 key up.
      window.addEventListener('keyup', function(e) {
        gameArea.keys[e.keyCode] = false;
      })
    },
    clear : function() {
      this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function startGame() {
  gameArea.start();
  playerPiece = new component(30,50,"black",450,600-50);
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    if ( (this.x + this.speedX > -10) && (this.x + this.speedX < 872) ) {
      this.x += this.speedX;
    }
  }
}

function updateGameArea() {
  gameArea.clear();
  playerPiece.speedX = 0;
  if (gameArea.keys && gameArea.keys[37]) {
    playerPiece.speedX = -10;
  }
  if (gameArea.keys && gameArea.keys[39]) {
    playerPiece.speedX = 10;
  }
  playerPiece.newPos();
  playerPiece.update();
}

startGame();
