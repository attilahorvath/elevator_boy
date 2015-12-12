'use strict';

class Floor {
  constructor(game, index, color) {
    this.game = game;

    this.index = index;
    this.color = color;
  }

  update(deltaTime) {}

  draw(context) {
    context.fillStyle = this.color;

    context.fillRect(0, this.index * 100, 300, 100);
  }
}

export default Floor;
