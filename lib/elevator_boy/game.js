'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elevator = require('./elevator');

var _elevator2 = _interopRequireDefault(_elevator);

var _floor = require('./floor');

var _floor2 = _interopRequireDefault(_floor);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

var _cargo = require('./cargo');

var _cargo2 = _interopRequireDefault(_cargo);

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

    this.elevator = new _elevator2.default(this);

    this.floors = [];

    for (var i = 0; i < 3; i++) {
      this.addFloor();
    }

    this.floorTimer = 0;
    this.floorDelay = 13000;

    for (var i = 0; i < 3; i++) {
      this.addCargo();
    }

    this.cargoTimer = 0;
    this.cargoDelay = 2500;

    this.storeTimer = 0;
    this.storeDelay = 4000;

    this.lastTime = performance.now();
  }

  _createClass(Game, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var currentTime = performance.now();
      var deltaTime = currentTime - this.lastTime;

      this.update(deltaTime);
      this.draw();

      this.lastTime = currentTime;

      requestAnimationFrame(function () {
        return _this.run();
      });
    }
  }, {
    key: 'update',
    value: function update(deltaTime) {
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
  }, {
    key: 'draw',
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.translate(0, 240 - this.elevator.y);

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
      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }, {
    key: 'addFloor',
    value: function addFloor() {
      this.floors.push(new _floor2.default(this, this.floors.length, new _color2.default(this.floors.length * 100, 75, 40)));
    }
  }, {
    key: 'addCargo',
    value: function addCargo() {
      var floor = Math.floor(this.floors.length * Math.random() % this.floors.length);
      var target = -1;
      do {
        target = Math.floor(this.floors.length * Math.random() % this.floors.length);
      } while (floor === target);
      this.floors[floor].addCargo(new _cargo2.default(this, target));
    }
  }, {
    key: 'addStores',
    value: function addStores() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.floors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var floor = _step3.value;

          floor.addStore();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }]);

  return Game;
})();

exports.default = Game;