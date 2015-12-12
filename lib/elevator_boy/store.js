'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = (function () {
  function Store(game, type) {
    _classCallCheck(this, Store);

    this.game = game;

    this.type = type;
  }

  _createClass(Store, [{
    key: 'draw',
    value: function draw(context, x, y) {
      context.fillStyle = 'green';
      context.fillRect(x, y, 100, 100);
    }
  }]);

  return Store;
})();

exports.default = Store;