'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elevator = (function () {
  function Elevator(game) {
    var _this = this;

    _classCallCheck(this, Elevator);

    this.game = game;

    this.x = 0;
    this.y = 100;

    this.moving = false;
    this.direction = null;

    this.floor = 0;
    this.target = 0;

    this.command = null;

    addEventListener('keydown', function (event) {
      if (event.which === 38) {
        _this.command = 'up';
        event.preventDefault();
      } else if (event.which === 40) {
        _this.command = 'down';
        event.preventDefault();
      }
    });
  }

  _createClass(Elevator, [{
    key: 'update',
    value: function update(deltaTime) {
      if (this.command === 'up' && this.floor > 0) {
        this.target = this.floor - 1;
      } else if (this.command === 'down' && this.floor < this.game.floors.length - 1) {
        this.target = this.floor + 1;
      }

      this.command = null;

      this.floor = this.target;
      this.y = this.floor * 100;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = (0, _get_image2.default)('images/elevator.png');

      if (image) {
        context.drawImage(image, this.x, this.y);
      }
    }
  }]);

  return Elevator;
})();

exports.default = Elevator;