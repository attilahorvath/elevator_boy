(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./elevator_boy/game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default();
game.run();
},{"./elevator_boy/game":4}],2:[function(require,module,exports){
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
},{"./get_image":5}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./elevator":2,"./floor":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var images = new Map();

var getImage = function getImage(path) {
  var image = images.get(path);

  if (image) {
    return image.loaded ? image : null;
  } else {
    image = new Image();
    image.loaded = false;

    image.addEventListener('load', function () {
      image.loaded = true;
    });

    image.src = path;

    images.set(path, image);

    return getImage(path);
  }
};

exports.default = getImage;
},{}]},{},[1]);
