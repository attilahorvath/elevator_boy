(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./elevator_boy/game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default();
game.run();
},{"./elevator_boy/game":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var normalizeHue = function normalizeHue(hue) {
  while (hue < 0) {
    hue += 360;
  }

  while (hue > 360) {
    hue -= 360;
  }

  return hue;
};

var Color = (function () {
  function Color(hue, saturation, lightness) {
    _classCallCheck(this, Color);

    this.hue = hue ? normalizeHue(hue) : 0;
    this.saturation = saturation || 100;
    this.lightness = lightness || 50;
  }

  _createClass(Color, [{
    key: 'cssValue',
    value: function cssValue() {
      return 'hsl(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%)';
    }
  }, {
    key: 'complementary',
    value: function complementary() {
      return new Color(180 - this.hue, this.saturation, this.lightness);
    }
  }]);

  return Color;
})();

exports.default = Color;
},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cargo = require('./cargo');

var _cargo2 = _interopRequireDefault(_cargo);

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elevator = (function () {
  function Elevator(game) {
    var _this = this;

    _classCallCheck(this, Elevator);

    this.game = game;

    this.y = 400;

    this.floor = 0;
    this.target = 0;

    this.cargoes = [];

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
      if (this.target === this.floor) {
        if (this.command === 'up' && this.floor < this.game.floors.length - 1) {
          this.target = this.floor + 1;
        } else if (this.command === 'down' && this.floor > 0) {
          this.target = this.floor - 1;
        }
      }

      this.command = null;

      if (this.target !== this.floor) {
        if (this.target < this.floor) {
          this.y += 0.1 * deltaTime;
          if (this.y >= 400 - this.target * 100) {
            this.floor = this.target;
            this.y = 400 - this.target * 100;
          }
        } else {
          this.y -= 0.1 * deltaTime;
          if (this.y <= 400 - this.target * 100) {
            this.floor = this.target;
            this.y = 400 - this.target * 100;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var image = (0, _get_image2.default)('images/elevator.png');

      if (image) {
        context.drawImage(image, 0, this.y);
      }

      for (var c = 0; c < this.cargoes.length; c++) {
        this.cargoes[c].draw(context, 10 + c * 15, this.y + 85);
      }
    }
  }, {
    key: 'addCargo',
    value: function addCargo(cargo) {
      this.cargoes.push(cargo);
    }
  }]);

  return Elevator;
})();

exports.default = Elevator;
},{"./cargo":2,"./get_image":7}],5:[function(require,module,exports){
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
},{"./store":8}],6:[function(require,module,exports){
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
},{"./cargo":2,"./color":3,"./elevator":4,"./floor":5}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}]},{},[1]);
