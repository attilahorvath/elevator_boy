'use strict';

import Elevator from './elevator';
import Floor from './floor';
import Color from './color';
import Cargo from './cargo';

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.elevator = new Elevator(this);

    this.floors = [];

    for (let i = 0; i < 3; i++) {
      this.addFloor();
    }

    this.floorTimer = 0;
    this.floorDelay = 13000;

    for (let i = 0; i < 3; i++) {
      this.addCargo();
    }

    this.cargoTimer = 0;
    this.cargoDelay = 2500;

    this.storeTimer = 0;
    this.storeDelay = 4000;

    this.lastTime = performance.now();
  }

  run() {
    let currentTime = performance.now();
    let deltaTime = currentTime - this.lastTime;

    this.update(deltaTime);
    this.draw();

    this.lastTime = currentTime;

    requestAnimationFrame(() => this.run());
  }

  update(deltaTime) {
    for (let floor of this.floors) {
      floor.update(deltaTime);
    }

    this.elevator.update(deltaTime);

    this.floorTimer += deltaTime;

    if (this.floorTimer >= this.floorDelay) {
      this.addFloor();
      this.floorTimer = 0;
    }

    this.cargoTimer += deltaTime;

    if (this.cargoTimer >= this.cargoDelay) {
      this.addCargo();
      this.cargoTimer = 0;
    }

    this.storeTimer += deltaTime;

    if (this.storeTimer >= this.storeDelay) {
      this.addStores();
      this.storeTimer = 0;
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(0, 240 - this.elevator.y);

    for (let floor of this.floors) {
      floor.draw(this.context);
    }

    this.elevator.draw(this.context);
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  addFloor() {
    this.floors.push(new Floor(this, this.floors.length, new Color(this.floors.length * 100, 75, 40)));
  }

  addCargo() {
    let floor = Math.floor(this.floors.length * Math.random() % this.floors.length);
    let target = -1;
    do {
       target = Math.floor(this.floors.length * Math.random() % this.floors.length);
    } while (floor === target);
    this.floors[floor].addCargo(new Cargo(this, target));
  }

  addStores() {
    for (let floor of this.floors) {
      floor.addStore();
    }
  }
}

export default Game;
