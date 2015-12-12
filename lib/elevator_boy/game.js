'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elevator = require('./elevator');

var _elevator2 = _interopRequireDefault(_elevator);

var _floor = require('./floor');

var _floor2 = _interopRequireDefault(_floor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.floors = [];

    this.floors.push(new _floor2.default(this, 0, 'red'));
    this.floors.push(new _floor2.default(this, 1, 'green'));
    this.floors.push(new _floor2.default(this, 2, 'blue'));

    this.elevator = new _elevator2.default(this);

    this.lastTime = performance.now();
  }

  _createClass(Game, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var currentTime = performance.now();
      var deltaTime = currentTime - this.lastTime;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.floors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var floor = _step.value;

          floor.update(deltaTime);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.elevator.update(deltaTime);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.floors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var floor = _step2.value;

          floor.draw(this.context);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.elevator.draw(this.context);

      this.lastTime = currentTime;

      requestAnimationFrame(function () {
        return _this.run();
      });
    }
  }]);

  return Game;
})();

exports.default = Game;