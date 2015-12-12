'use strict';

class Store {
  constructor(game, type) {
    this.game = game;

    this.type = type;
  }

  draw(context, x, y) {
    context.fillStyle = 'green';
    context.fillRect(x, y, 100, 100);
  }
}

export default Store;
