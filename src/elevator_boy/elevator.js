'use strict';

import Cargo from './cargo';
import getImage from './get_image';

class Elevator {
  constructor(game) {
    this.game = game;

    this.y = 400;

    this.floor = 0;
    this.target = 0;

    this.cargoes = [];

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
    if (this.target === this.floor) {
      if (this.command === 'up' && this.floor < this.game.floors.length - 1) {
        this.target = this.floor + 1;
      } else if (this.command === 'down' && this.floor > 0) {
        this.target = this.floor - 1;
      }
    }

    this.command = null;

    if (this.target !== this.floor) {
      if (this.target < this.floor) {
        this.y += 0.1 * deltaTime;
        if (this.y >= 400 - this.target * 100) {
          this.floor = this.target;
          this.y = 400 - this.target * 100;
        }
      } else {
        this.y -= 0.1 * deltaTime;
        if (this.y <= 400 - this.target * 100) {
          this.floor = this.target;
          this.y = 400 - this.target * 100;
        }
      }
    }
  }

  draw(context) {
    let image = getImage('images/elevator.png');

    if (image) {
      context.drawImage(image, 0, this.y);
    }

    for (let c = 0; c < this.cargoes.length; c++) {
      this.cargoes[c].draw(context, 10 + c * 15, this.y + 85);
    }
  }

  addCargo(cargo) {
    this.cargoes.push(cargo);
  }
}

export default Elevator;
