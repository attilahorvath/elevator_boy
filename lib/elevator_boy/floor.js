'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Floor = (function () {
  function Floor(game, index, color) {
    _classCallCheck(this, Floor);

    this.game = game;

    this.index = index;
    this.color = color;

    this.cargoes = [];

    this.stores = [];

    for (var i = 0; i < 3; i++) {
      this.addStore();
    }
  }

  _createClass(Floor, [{
    key: 'update',
    value: function update(deltaTime) {}
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = this.color.cssValue();

      //context.fillRect(100, 400 - this.index * 100, 600, 100);

      for (var s = 0; s < this.stores.length; s++) {
        this.stores[s].draw(context, 100 + s * 100, 400 - this.index * 100);
      }

      context.fillStyle = 'black';
      context.font = '28px sans-serif';
      context.textBaseline = 'top';

      context.fillText(this.index.toString(), 120, 420 - this.index * 100);

      for (var c = 0; c < this.cargoes.length; c++) {
        this.cargoes[c].draw(context, 120 + c * 20, 470 - this.index * 100);
      }
    }
  }, {
    key: 'addCargo',
    value: function addCargo(cargo) {
      this.cargoes.push(cargo);
    }
  }, {
    key: 'addStore',
    value: function addStore() {
      this.stores.push(new _store2.default());
    }
  }]);

  return Floor;
})();

exports.default = Floor;