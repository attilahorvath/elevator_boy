'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Floor = (function () {
  function Floor(game, index, color) {
    _classCallCheck(this, Floor);

    this.game = game;

    this.index = index;
    this.color = color;
  }

  _createClass(Floor, [{
    key: 'update',
    value: function update(deltaTime) {}
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = this.color;

      context.fillRect(0, this.index * 100, 300, 100);
    }
  }]);

  return Floor;
})();

exports.default = Floor;