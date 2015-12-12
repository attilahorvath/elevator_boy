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