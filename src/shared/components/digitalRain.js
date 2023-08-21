import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const DEFAULT_OPTIONS = {
  size: () => window.innerWidth * 0.010,
  family: 'JetBrains Mono, monospace',
  fps: 12,
  hue: 40,
  limiter: 0.25,
  glyphs: 'ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

const DigitalRainComponent = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const CANVAS = canvasRef.current;
    if (CANVAS) {
      const digitalRainInstance = new DigitalRain(CANVAS, DEFAULT_OPTIONS);

      return () => {
        digitalRainInstance.pause();
      };
    }
  }, []);

  return <canvas id="rain" ref={canvasRef} {...props} />;
};

class DigitalRain {
  constructor(el, options) {
    this.__ratio = window.devicePixelRatio || 1;
    this.canvas = el;
    this.options = options;
    this.size = options.size;
    this.glyphs = this.options.glyphs.split('');
    this.context = el.getContext('2d');
    this.setSize();
    this.setTracker();
    this.init();
  }

  setColumn(column = {}) {
    // const { glyphs } = this;
    const len = gsap.utils.random(6, this.rows, 1);
    const lastLen = column.len || len;
    const destination = gsap.utils.random(this.rows * 0.1, this.rows + len, 1);
    const lastDestination = column.destination || destination;
    const tailEnd = lastDestination + lastLen;
    let chars = column.chars || [];
    let cacheChars = [...chars];
    chars = new Array(Math.max(destination, chars.length)).fill().map((entry, index) => {
      if (index <= destination) {
        return this.glyphs[gsap.utils.random(0, this.glyphs.length - 1, 1)];
      } else {
        return cacheChars[index];
      }
    });
    const row = gsap.utils.random(-this.rows, -1, 1);
    return {
      ...column,
      chars,
      cacheChars,
      destination,
      lastDestination,
      lastLen,
      tailEnd,
      tailCounter: lastDestination,
      row,
      len,
    };
  }

  setTracker() {
    this.tracker = new Array(this.columns).fill().map(() => this.setColumn());
  }

  reset() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.setSize();
    this.setTracker();
  }

  init() {
    this.renderMatrix = () => this.render();
    this.resetOnSize = () => this.reset();
    window.addEventListener('resize', this.resetOnSize);
    gsap.ticker.add(this.renderMatrix);
    gsap.ticker.fps(this.options.fps);
    this.pause = () => {
      gsap.ticker.remove(this.renderMatrix);
    };
    this.play = () => {
      gsap.ticker.add(this.renderMatrix);
    };
  }

  getColor(x, y, column) {
    const self = this;
    const lower = 0.1;
    const upper = 1;
    let alpha = 0.1;

    if (y <= column.row) {
      alpha = gsap.utils.clamp(
        lower,
        upper,
        gsap.utils.mapRange(-column.len, 0, lower, upper)(y - column.row)
      );
    } else if (y > column.row && y <= column.lastDestination) {
      alpha = gsap.utils.clamp(
        lower,
        upper,
        gsap.utils.mapRange(-column.lastLen, 0, lower, upper)(y - column.tailCounter)
      );
    } else if (y > column.lastDestination) {
      alpha = lower;
    }
    return `hsl(${column.hue || self.options.hue}, 100%, ${column.row === y ? 100 : 70}%, ${alpha})`;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let c = 0; c < this.characters; c++) {
      const x = c % this.columns;
      const y = Math.floor(c / this.columns);
      const column = this.tracker[x];

      if (y === 0 && Math.random() > 0.1) {
        column.row += 1;
      }

      if (column.tailCounter !== column.tailOff && y === 0) {
        column.tailCounter += 1;
      }

      const row = column.row;
      const chars = column[y > row ? 'cacheChars' : 'chars'];
      this.context.fillStyle = this.getColor(x, y, column);

      this.context.globalAlpha = this.getAlphaForPosition(x, y);

      if (chars[y]) {
        if (Math.random() > 0.999 && y > row) {
          column.cacheChars[y] = column.chars[y] = '';
        }
        if (Math.random() > 0.99 && (y < row && y < column.destination && y > (column.destination - column.len))) {
          column.cacheChars[y] = column.chars[y] = this.glyphs[gsap.utils.random(0, this.glyphs.length - 1, 1)];
        }
        this.context.fillText(
          chars[y],
          (x + 0.5) * this.fontSize,
          (y + 1) * this.fontSize
        );
      }
      if (row > column.destination) {
        this.tracker[x] = this.setColumn(column);
      }
    }
  }

  setSize() {
    const { height, width } = this.canvas.getBoundingClientRect();
    this.canvas.height = height * this.__ratio;
    this.canvas.width = width * this.__ratio;
    this.fontSize = Math.ceil(typeof this.size === 'function' ? this.size() : this.size);
    this.columns = Math.ceil(this.canvas.width / this.fontSize);
    this.rows = Math.ceil(this.canvas.height / this.fontSize);
    this.characters = this.rows * this.columns;
    this.context.font = `${this.fontSize}px ${this.options.family}`;
    this.context.textAlign = 'center';
  }

  getAlphaForPosition(x, y) {
    const edgeSize = 50; // number of pixels from edge to start fading
    let alpha = 1;

    // left edge
    if (x <= edgeSize) {
        alpha = x / edgeSize;
    }

    // right edge
    if (x >= this.columns - edgeSize) {
        alpha = (this.columns - x) / edgeSize;
    }

    // bottom edge
    if (y >= this.rows - edgeSize) {
        alpha = Math.min(alpha, (this.rows - y) / edgeSize);
    }

    return alpha;
}

}

export default DigitalRainComponent;