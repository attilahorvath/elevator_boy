'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cargo = (function () {
  function Cargo(game, target, type, lifetime) {
    _classCallCheck(this, Cargo);

    this.game = game;

    this.target = target;
    this.type = type;
    this.lifetime = lifetime;
  }

  _createClass(Cargo, [{
    key: 'draw',
    value: function draw(context, x, y) {
      context.fillStyle = 'black';
      //context.fillRect(x, y, 10, 10);
      context.fillText(this.target.toString(), x, y);
    }
  }]);

  return Cargo;
})();

exports.default = Cargo;