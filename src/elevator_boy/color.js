'use strict';

let normalizeHue = hue => {
  while (hue < 0) {
    hue += 360;
  }

  while (hue > 360) {
    hue -= 360;
  }

  return hue;
};

class Color {
  constructor(hue, saturation, lightness) {
    this.hue = hue ? normalizeHue(hue) : 0;
    this.saturation = saturation || 100;
    this.lightness = lightness || 50;
  }

  cssValue() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  }

  complementary() {
    return new Color(180 - this.hue, this.saturation, this.lightness);
  }
}

export default Color;
