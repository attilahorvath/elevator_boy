'use strict';

import Elevator from './elevator';
import Floor from './floor';

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.floors = [];

    this.floors.push(new Floor(this, 0, 'red'));
    this.floors.push(new Floor(this, 1, 'green'));
    this.floors.push(new Floor(this, 2, 'blue'));

    this.elevator = new Elevator(this);

    this.lastTime = performance.now();
  }

  run() {
    let currentTime = performance.now();
    let deltaTime = currentTime - this.lastTime;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let floor of this.floors) {
      floor.update(deltaTime);
    }

    this.elevator.update(deltaTime);

    for (let floor of this.floors) {
      floor.draw(this.context);
    }

    this.elevator.draw(this.context);

    this.lastTime = currentTime;

    requestAnimationFrame(() => this.run());
  }
}

export default Game;
