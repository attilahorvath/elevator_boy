'use strict';

import Store from './store';

class Floor {
  constructor(game, index, color) {
    this.game = game;

    this.index = index;
    this.color = color;

    this.cargoes = [];

    this.stores = [];

    for (let i = 0; i < 2; i++) {
      this.addStore();
    }
  }

  update(deltaTime) {}

  draw(context) {
    context.fillStyle = this.color.cssValue();

    context.fillRect(100, 400 - this.index * 100, this.stores.length * 100, 100);

    for (let s = 0; s < this.stores.length; s++) {
      this.stores[s].draw(context, 100 + s * 100, 400 - this.index * 100);
    }

    context.fillStyle = 'black';
    context.font = '28px sans-serif';
    context.textBaseline = 'top';

    context.fillText(this.index.toString(), 120, 420 - this.index * 100);

    for (let c = 0; c < this.cargoes.length; c++) {
      this.cargoes[c].draw(context, 120 + c * 20, 470 - this.index * 100);
    }
  }

  addCargo(cargo) {
    this.cargoes.push(cargo);
  }

  addStore() {
    this.stores.push(new Store);
  }
}

export default Floor;
