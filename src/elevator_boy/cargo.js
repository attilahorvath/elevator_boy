'use strict';

class Cargo {
  constructor(game, target, type, lifetime) {
    this.game = game;

    this.target = target;
    this.type = type;
    this.lifetime = lifetime;
  }

  draw(context, x, y) {
    context.fillStyle = 'black';
    //context.fillRect(x, y, 10, 10);
    context.fillText(this.target.toString(), x, y);
  }
}

export default Cargo;
