'use strict';

import getImage from './get_image';

class Elevator {
  constructor(game) {
    this.game = game;

    this.x = 0;
    this.y = 100;

    this.moving = false;
    this.direction = null;

    this.floor = 0;
    this.target = 0;

    this.command = null;

    addEventListener('keydown', event => {
      if (event.which === 38) {
        this.command = 'up';
        event.preventDefault();
      } else if (event.which === 40) {
        this.command = 'down';
        event.preventDefault();
      }
    });
  }

  update(deltaTime) {
    if (this.command === 'up' && this.floor > 0) {
      this.target = this.floor - 1;
    } else if (this.command === 'down' && this.floor < this.game.floors.length - 1) {
      this.target = this.floor + 1;
    }

    this.command = null;

    this.floor = this.target;
    this.y = this.floor * 100;
  }

  draw(context) {
    let image = getImage('images/elevator.png');

    if (image) {
      context.drawImage(image, this.x, this.y);
    }
  }
}

export default Elevator;
