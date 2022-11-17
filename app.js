const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];

for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];

floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 192) {
      // console.log(x);
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];

for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 192) {
      // console.log(x);
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const gravity = 0.5;

const player = new Player({
  position: {
    x: 100,
    y: 340,
  },
  collisionBlocks: collisionBlocks,
  imageSrc: "./assets/warrior/Idle.png",
  frameRate: 8,
  frameBuffer: 12,
  animations: {
    Idle: {
      imageSrc: "./assets/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 8,

    },
    Run: {
      imageSrc: "./assets/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 7,
    },
    Jump: {
      imageSrc: "./assets/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: "./assets/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 3,
    },
  },
});

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.forEach((block) => {
    block.update();
  });
  platformCollisionBlocks.forEach((block) => {
    block.update();
  });
  player.update();

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 2;
  } else if (keys.a.pressed) {
    player.velocity.x = -2;
  } else if (player.velocity.y === 0) {
    player.switchSprite("Idle");
  }
  if (player.velocity.y < 0) {
    player.switchSprite("Jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("Fall")
  }
  c.restore();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -8;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
