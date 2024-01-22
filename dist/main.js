/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/color-convert/conversions.js":
/*!***************************************************!*\
  !*** ./node_modules/color-convert/conversions.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/color-convert/index.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/color-convert/conversions.js");
const route = __webpack_require__(/*! ./route */ "./node_modules/color-convert/route.js");

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/color-convert/route.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/route.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/color-convert/conversions.js");

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/colorToFilter/colorParser/colorParser.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/colorToFilter/colorParser/colorParser.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorParser = void 0;
const regex_1 = __webpack_require__(/*! ../../shared/consts/regex */ "./node_modules/css-filter-converter/lib/shared/consts/regex.js");
const errorHandling_1 = __webpack_require__(/*! ../../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const inputLimits_1 = __webpack_require__(/*! ../../shared/consts/inputLimits */ "./node_modules/css-filter-converter/lib/shared/consts/inputLimits.js");
const colorFormats_1 = __webpack_require__(/*! ../../shared/consts/colorFormats */ "./node_modules/css-filter-converter/lib/shared/consts/colorFormats.js");
const colorTypes_1 = __webpack_require__(/*! ../../shared/consts/colorTypes */ "./node_modules/css-filter-converter/lib/shared/consts/colorTypes.js");
// eslint-disable-next-line import/no-extraneous-dependencies
const color_name_1 = __importDefault(__webpack_require__(/*! color-name */ "./node_modules/color-name/index.js"));
class ColorParser {
    static validateAndParseHex(hexString) {
        if (hexString.length < inputLimits_1.MAX_COLOR_INPUT_STRING_LENGTH) {
            const isValid = hexString.match(regex_1.MATCH_HEXADECIMAL);
            if (isValid)
                return { color: hexString };
        }
        return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.HEX, hexString, colorFormats_1.ColorFormats.HEX) };
    }
    // the reason why this is simply parsing the first three digits instead of the tailored format is because the number
    // of variations of different inputs is very high. E.g. these are valid RGB values:
    // rgb(1,2,3)
    // rgb(1%,2%,3%)
    // rgb(1,2,3,0.5)
    // rgb(1 2 3 / 0.5)
    // rgb(1 2 3 / 50%)
    // Hence because the first three values are always consistent integers and the fourth is irrelevant, it is simpler to
    // parse the first three integers and use them accordingly
    static parseFirstThreeIntegersFromString(color) {
        if (color.length < inputLimits_1.MAX_COLOR_INPUT_STRING_LENGTH) {
            const regexResult = color.match(regex_1.MATCH_INTEGER_AND_FLOAT_NUMBERS);
            regex_1.MATCH_INTEGER_AND_FLOAT_NUMBERS.lastIndex = 0;
            if (regexResult && regexResult.length >= 3) {
                return regexResult.slice(0, 3).map((numberString) => Number.parseInt(numberString));
            }
        }
        return null;
    }
    static validateAndParseRgb(rgbString) {
        const rgb = ColorParser.parseFirstThreeIntegersFromString(rgbString);
        if (rgb && rgb[0] >= 0 && rgb[0] <= 255 && rgb[1] >= 0 && rgb[1] <= 255 && rgb[2] >= 0 && rgb[2] <= 255) {
            return { color: rgb };
        }
        return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.RGB, rgbString, colorFormats_1.ColorFormats.RGB) };
    }
    static validateAndParseHsl(hslString) {
        const hsl = ColorParser.parseFirstThreeIntegersFromString(hslString);
        if (hsl && hsl[0] >= 0 && hsl[0] <= 360 && hsl[1] >= 0 && hsl[1] <= 100 && hsl[2] >= 0 && hsl[2] <= 100) {
            return { color: hsl };
        }
        return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.HSL, hslString, colorFormats_1.ColorFormats.HSL) };
    }
    static validateAndParseKeyword(keyword) {
        if (keyword.length < inputLimits_1.MAX_COLOR_INPUT_STRING_LENGTH) {
            const isValid = color_name_1.default[keyword];
            if (isValid)
                return { color: keyword };
        }
        return { errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.KEYWORD, keyword, colorFormats_1.ColorFormats.KEYWORD) };
    }
}
exports.ColorParser = ColorParser;
// There is a unique opportunity to validate the color input when this library operates in the browser
// by creating a new element on the dom and adding the color to it to see if it is valid.
// However it was decided not to use this approach as formats like hsl(1,2,3) are invalid in html elements.
// Additionally, it can also be time consuming to create/find an element, adding color to it and validating
// that color.


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/colorToFilter/colorToFilter.js":
/*!******************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/colorToFilter/colorToFilter.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorToFilter = void 0;
const errorHandling_1 = __webpack_require__(/*! ../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const sheenUtil_1 = __webpack_require__(/*! ../shared/functionality/sheen/sheenUtil */ "./node_modules/css-filter-converter/lib/shared/functionality/sheen/sheenUtil.js");
const colorTypes_1 = __webpack_require__(/*! ../shared/consts/colorTypes */ "./node_modules/css-filter-converter/lib/shared/consts/colorTypes.js");
const rgbToFilter_1 = __webpack_require__(/*! ./rgbToFilter/rgbToFilter */ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilter.js");
const colorParser_1 = __webpack_require__(/*! ./colorParser/colorParser */ "./node_modules/css-filter-converter/lib/colorToFilter/colorParser/colorParser.js");
const color_convert_1 = __importDefault(__webpack_require__(/*! color-convert */ "./node_modules/color-convert/index.js"));
class ColorToFilter {
    static rgbToFilter(rgbString, options) {
        return rgbToFilter_1.RgbToFilter.convert({
            colorString: rgbString,
            validateAndParse: colorParser_1.ColorParser.validateAndParseRgb,
            addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options),
        });
    }
    static hexToFilter(hexString, options) {
        return rgbToFilter_1.RgbToFilter.convert({
            colorString: hexString,
            validateAndParse: colorParser_1.ColorParser.validateAndParseHex,
            convertToRgb: color_convert_1.default.hex.rgb,
            addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options),
        });
    }
    static hslToFilter(hslString, options) {
        return rgbToFilter_1.RgbToFilter.convert({
            colorString: hslString,
            validateAndParse: colorParser_1.ColorParser.validateAndParseHsl,
            convertToRgb: color_convert_1.default.hsl.rgb,
            addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options),
        });
    }
    static keywordToFilter(keyword, options) {
        return rgbToFilter_1.RgbToFilter.convert({
            colorString: keyword,
            validateAndParse: colorParser_1.ColorParser.validateAndParseKeyword,
            convertToRgb: color_convert_1.default.keyword.rgb,
            conversionErrorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.KEYWORD, keyword),
            addSheen: sheenUtil_1.SheenUtil.parseSheenFromOptions(options),
        });
    }
}
exports.ColorToFilter = ColorToFilter;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbColor.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbColor.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RgbColor = void 0;
class RgbColor {
    constructor(rgb = [0, 0, 0]) {
        this.r = this.clamp(rgb[0]);
        this.g = this.clamp(rgb[1]);
        this.b = this.clamp(rgb[2]);
    }
    clamp(value) {
        if (value > 255) {
            value = 255;
        }
        else if (value < 0) {
            value = 0;
        }
        return value;
    }
    setRgb(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }
    multiply(matrix) {
        const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
        const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
        const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
        this.r = newR;
        this.g = newG;
        this.b = newB;
    }
    hueRotate(angle = 0) {
        angle = (angle / 180) * Math.PI;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        this.multiply([
            0.213 + cos * 0.787 - sin * 0.213,
            0.715 - cos * 0.715 - sin * 0.715,
            0.072 - cos * 0.072 + sin * 0.928,
            0.213 - cos * 0.213 + sin * 0.143,
            0.715 + cos * 0.285 + sin * 0.14,
            0.072 - cos * 0.072 - sin * 0.283,
            0.213 - cos * 0.213 - sin * 0.787,
            0.715 - cos * 0.715 + sin * 0.715,
            0.072 + cos * 0.928 + sin * 0.072,
        ]);
    }
    sepia(value = 1) {
        this.multiply([
            0.393 + 0.607 * (1 - value),
            0.769 - 0.769 * (1 - value),
            0.189 - 0.189 * (1 - value),
            0.349 - 0.349 * (1 - value),
            0.686 + 0.314 * (1 - value),
            0.168 - 0.168 * (1 - value),
            0.272 - 0.272 * (1 - value),
            0.534 - 0.534 * (1 - value),
            0.131 + 0.869 * (1 - value),
        ]);
    }
    saturate(value = 1) {
        this.multiply([
            0.213 + 0.787 * value,
            0.715 - 0.715 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 + 0.285 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 - 0.715 * value,
            0.072 + 0.928 * value,
        ]);
    }
    linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + intercept * 255);
        this.g = this.clamp(this.g * slope + intercept * 255);
        this.b = this.clamp(this.b * slope + intercept * 255);
    }
    brightness(value = 1) {
        this.linear(value);
    }
    contrast(value = 1) {
        this.linear(value, -(0.5 * value) + 0.5);
    }
    invert(value = 1) {
        this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
        this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
        this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
    }
}
exports.RgbColor = RgbColor;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilter.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilter.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RgbToFilter = void 0;
const errorHandling_1 = __webpack_require__(/*! ../../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const errors_1 = __webpack_require__(/*! ../../shared/consts/errors */ "./node_modules/css-filter-converter/lib/shared/consts/errors.js");
const rgbToFilterWorker_1 = __webpack_require__(/*! ./rgbToFilterWorker */ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilterWorker.js");
const rgbColor_1 = __webpack_require__(/*! ./rgbColor */ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbColor.js");
class RgbToFilter {
    static generateConversionError(conversionErrorMessage) {
        const errorMessage = conversionErrorMessage || errors_1.DEFAULT_CONVERSION_ERROR_MESSAGE;
        return errorHandling_1.ErrorHandling.generateErrorResult(errorMessage);
    }
    static generateValidateAndParseError(errorMessage) {
        return errorHandling_1.ErrorHandling.generateErrorResult(errorMessage);
    }
    static execute(rgb, addSheen) {
        const rgbColor = new rgbColor_1.RgbColor(rgb);
        const rgbToFilter = new rgbToFilterWorker_1.RgbToFilterWorker(rgbColor, addSheen);
        return rgbToFilter.convert();
    }
    static convertToRGB(parseResultColor, convertToRgb) {
        if (parseResultColor && convertToRgb) {
            return convertToRgb(parseResultColor);
        }
        return null;
    }
    static convert(conversionProps) {
        try {
            const { colorString, validateAndParse, convertToRgb, conversionErrorMessage, addSheen } = conversionProps;
            const trimmedString = colorString.trim().toLocaleLowerCase();
            const parseResult = (validateAndParse === null || validateAndParse === void 0 ? void 0 : validateAndParse(trimmedString)) || { color: trimmedString };
            if (errorHandling_1.ErrorHandling.hasError(parseResult))
                return RgbToFilter.generateValidateAndParseError(parseResult.errorMessage);
            const rgbColor = RgbToFilter.convertToRGB(parseResult.color, convertToRgb) || parseResult.color;
            if (!rgbColor)
                return RgbToFilter.generateConversionError(conversionErrorMessage);
            return RgbToFilter.execute(rgbColor, addSheen);
        }
        catch (error) {
            return errorHandling_1.ErrorHandling.generateUnexpectedError(error);
        }
    }
}
exports.RgbToFilter = RgbToFilter;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilterWorker.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbToFilterWorker.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// the code used within this class has been taken and modified from the following codepen owned by Barrett Sonntag:
// https://codepen.io/sosuke/pen/Pjoqqp
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RgbToFilterWorker = void 0;
const sheenUtil_1 = __webpack_require__(/*! ../../shared/functionality/sheen/sheenUtil */ "./node_modules/css-filter-converter/lib/shared/functionality/sheen/sheenUtil.js");
const rgbColor_1 = __webpack_require__(/*! ./rgbColor */ "./node_modules/css-filter-converter/lib/colorToFilter/rgbToFilter/rgbColor.js");
class RgbToFilterWorker {
    constructor(targetRgbColor, addSheen) {
        this.targetRgbColor = targetRgbColor;
        this.reusedRgbColor = new rgbColor_1.RgbColor();
        this.addSheen = addSheen;
    }
    static fmt(filters, idx, multiplier = 1) {
        return Math.round(filters[idx] * multiplier);
    }
    generateCss(filters) {
        const prefix = this.addSheen ? `${sheenUtil_1.SheenUtil.SHEEN_FILTER_PREFIX} ` : '';
        // prettier-ignore
        // eslint-disable-next-line max-len
        return `${prefix}invert(${RgbToFilterWorker.fmt(filters, 0)}%) sepia(${RgbToFilterWorker.fmt(filters, 1)}%) saturate(${RgbToFilterWorker.fmt(filters, 2)}%) hue-rotate(${RgbToFilterWorker.fmt(filters, 3, 3.6)}deg) brightness(${RgbToFilterWorker.fmt(filters, 4)}%) contrast(${RgbToFilterWorker.fmt(filters, 5)}%)`;
    }
    loss(filters) {
        this.reusedRgbColor.setRgb(0, 0, 0);
        this.reusedRgbColor.invert(filters[0] / 100);
        this.reusedRgbColor.sepia(filters[1] / 100);
        this.reusedRgbColor.saturate(filters[2] / 100);
        this.reusedRgbColor.hueRotate(filters[3] * 3.6);
        this.reusedRgbColor.brightness(filters[4] / 100);
        this.reusedRgbColor.contrast(filters[5] / 100);
        return (Math.abs(this.reusedRgbColor.r - this.targetRgbColor.r) +
            Math.abs(this.reusedRgbColor.g - this.targetRgbColor.g) +
            Math.abs(this.reusedRgbColor.b - this.targetRgbColor.b));
    }
    static fixSpsa(value, idx) {
        let max = 100;
        if (idx === 2 /* saturate */) {
            max = 7500;
        }
        else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
            max = 200;
        }
        if (idx === 3 /* hue-rotate */) {
            if (value > max) {
                value %= max;
            }
            else if (value < 0) {
                value = max + (value % max);
            }
        }
        else if (value < 0) {
            value = 0;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }
    spsa(A, a, c, values, iters) {
        const alpha = 1;
        const gamma = 0.16666666666666666;
        let best = [];
        let bestLoss = Infinity;
        const deltas = new Array(6);
        const highArgs = new Array(6);
        const lowArgs = new Array(6);
        for (let k = 0; k < iters; k += 1) {
            const ck = c / Math.pow(k + 1, gamma);
            for (let i = 0; i < 6; i += 1) {
                deltas[i] = Math.random() > 0.5 ? 1 : -1;
                highArgs[i] = values[i] + ck * deltas[i];
                lowArgs[i] = values[i] - ck * deltas[i];
            }
            const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
            for (let i = 0; i < 6; i += 1) {
                const g = (lossDiff / (2 * ck)) * deltas[i];
                const ak = a[i] / Math.pow(A + k + 1, alpha);
                values[i] = RgbToFilterWorker.fixSpsa(values[i] - ak * g, i);
            }
            const loss = this.loss(values);
            if (loss < bestLoss) {
                best = values.slice(0);
                bestLoss = loss;
            }
        }
        return { values: best, loss: bestLoss };
    }
    solveNarrow(wide) {
        const A = wide.loss;
        const c = 2;
        const A1 = A + 1;
        const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
        return this.spsa(A, a, c, wide.values, 500);
    }
    solveWide() {
        const A = 5;
        const c = 15;
        const a = [60, 180, 18000, 600, 1.2, 1.2];
        let best = { values: [], loss: Infinity };
        for (let i = 0; best.loss > 25 && i < 3; i += 1) {
            const initial = [50, 20, 3750, 50, 100, 100];
            const result = this.spsa(A, a, c, initial, 1000);
            if (result.loss < best.loss) {
                best = result;
            }
        }
        return best;
    }
    convert() {
        const result = this.solveNarrow(this.solveWide());
        return {
            loss: result.loss,
            color: this.generateCss(result.values),
        };
    }
}
exports.RgbToFilterWorker = RgbToFilterWorker;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/filterToColor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/filterToColor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterToColor = void 0;
const filterToHex_1 = __webpack_require__(/*! ./filterToHex/filterToHex */ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/filterToHex.js");
const hexToColor_1 = __webpack_require__(/*! ./hexToColor/hexToColor */ "./node_modules/css-filter-converter/lib/filterToColor/hexToColor/hexToColor.js");
class FilterToColor {
    static async filterToHex(filterString) {
        const result = await filterToHex_1.FilterToHex.convert(filterString);
        if (result.color)
            result.color = result.color.toUpperCase();
        return result;
    }
    static async filterToRgb(filterString, options) {
        return filterToHex_1.FilterToHex.convert(filterString, hexToColor_1.HexToColor.convertToRgb, options);
    }
    static async filterToHsl(filterString, options) {
        return filterToHex_1.FilterToHex.convert(filterString, hexToColor_1.HexToColor.convertToHsl, options);
    }
}
exports.FilterToColor = FilterToColor;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/filterToHex.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/filterToHex/filterToHex.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterToHex = void 0;
const errorHandling_1 = __webpack_require__(/*! ../../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const browser_1 = __webpack_require__(/*! ./workers/browser */ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/browser.js");
class FilterToHex {
    static async convert(filterString, convertFromHex, options) {
        try {
            let result;
            if (typeof window === 'undefined') {
                const { FilterToHexNode } = await Promise.resolve().then(() => __importStar(__webpack_require__(/*! ./workers/node */ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/node.js")));
                result = await FilterToHexNode.convert(filterString);
            }
            else {
                result = await browser_1.FilterToHexBrowser.convert(filterString);
            }
            if (result.color && convertFromHex && typeof result.color === 'string') {
                result.color = convertFromHex(result.color, options);
            }
            return result;
        }
        catch (error) {
            return errorHandling_1.ErrorHandling.generateUnexpectedError(error);
        }
    }
}
exports.FilterToHex = FilterToHex;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/browser.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/browser.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterToHexBrowser = void 0;
const errorHandling_1 = __webpack_require__(/*! ../../../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const shared_1 = __webpack_require__(/*! ./shared */ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/shared.js");
class FilterToHexBrowser extends shared_1.FilterToHexShared {
    static cleanup(svgContainerElement) {
        svgContainerElement.remove();
    }
    static returnInputError(filterString, svgContainerElement) {
        const errorMessage = shared_1.FilterToHexShared.generateInputErrorMessage(filterString);
        const errorResult = errorHandling_1.ErrorHandling.generateErrorResult(errorMessage);
        FilterToHexBrowser.cleanup(svgContainerElement);
        return errorResult;
    }
    static async getImageBase64ViaSVG(svgContainerElement) {
        const domToImage = (await Promise.resolve().then(() => __importStar(__webpack_require__(/*! dom-to-image */ "./node_modules/dom-to-image/src/dom-to-image.js"))));
        return domToImage.toPng(svgContainerElement);
    }
    static async convert(filterString) {
        const { errorMessage, svgContainerElement } = shared_1.FilterToHexShared.addSVGElementsToDOMAndValidateFilter(filterString);
        if (errorMessage)
            return FilterToHexBrowser.returnInputError(filterString, svgContainerElement);
        const base64EncodedDataURL = await FilterToHexBrowser.getImageBase64ViaSVG(svgContainerElement);
        const hexColor = await shared_1.FilterToHexShared.getColorViaImageDataURL(base64EncodedDataURL);
        FilterToHexBrowser.cleanup(svgContainerElement);
        return { color: hexColor };
    }
}
exports.FilterToHexBrowser = FilterToHexBrowser;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/node.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/node.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterToHexNode = void 0;
const errorHandling_1 = __webpack_require__(/*! ../../../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const errors_1 = __webpack_require__(/*! ../../../shared/consts/errors */ "./node_modules/css-filter-converter/lib/shared/consts/errors.js");
const colorFormats_1 = __webpack_require__(/*! ../../../shared/consts/colorFormats */ "./node_modules/css-filter-converter/lib/shared/consts/colorFormats.js");
const colorTypes_1 = __webpack_require__(/*! ../../../shared/consts/colorTypes */ "./node_modules/css-filter-converter/lib/shared/consts/colorTypes.js");
const shared_1 = __webpack_require__(/*! ./shared */ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/shared.js");
class FilterToHexNode extends shared_1.FilterToHexShared {
    static cleanup(browser) {
        if (FilterToHexNode.IS_HEADLESS)
            browser === null || browser === void 0 ? void 0 : browser.close();
    }
    static returnError(errorMsg, browser) {
        const errorResult = errorHandling_1.ErrorHandling.generateErrorResult(errorMsg);
        FilterToHexNode.cleanup(browser);
        return errorResult;
    }
    static async getImageBase64ViaSVG(page) {
        const endodedScreenshotData = await page.screenshot({ encoding: FilterToHexNode.BASE_64_ENCODING });
        return `${FilterToHexNode.ENCODED_DATA_URL_PREFIX}${endodedScreenshotData}`;
    }
    static async openBrowserPage(browser) {
        const page = await browser.newPage();
        await page.setViewport({
            width: FilterToHexNode.SVG_SIDE_LENGTH_PX,
            height: FilterToHexNode.SVG_SIDE_LENGTH_PX,
        });
        return page;
    }
    static async addSVGAndValidateFilter(page, filterString) {
        const svgAddResult = await page.evaluate(shared_1.FilterToHexShared.addSVGElementsToDOMAndValidateFilter, filterString, FilterToHexNode.SVG_SIDE_LENGTH_PX);
        if (svgAddResult.errorMessage) {
            return {
                errorMessage: errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.FILTER, filterString, colorFormats_1.ColorFormats.FILTER),
            };
        }
        return svgAddResult;
    }
    static async getPuppeteerDependency() {
        try {
            // this is used to prevent tsc from evaluating the puppeteer module by adding dynamicity to the require path
            const pathPadding = '';
            // eslint-disable-next-line prefer-template
            return __webpack_require__("./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers sync recursive ^puppeteer.*$")("puppeteer" + pathPadding);
        }
        catch (e) {
            return { errorMessage: errors_1.MUST_INSTALL_PUPPETEER };
        }
    }
    static async preparePuppeteerBrowser() {
        const puppeteer = await FilterToHexNode.getPuppeteerDependency();
        if (errorHandling_1.ErrorHandling.hasError(puppeteer))
            return puppeteer;
        return puppeteer.launch({ headless: FilterToHexNode.IS_HEADLESS });
    }
    // puppeteer versions higher than 6.0.0 have a bug where the view blinks when taking a screnshot of a specific
    // element, hence in order to not have to force the user to install a specific version of puppeteer (especially if
    // they are already using it for another use-case), the logic here is configured to reduce the viewport to the svg
    // size and then proceed to take a screenshot of the viewport via the page.screenshot api
    static async convert(filterString) {
        const browser = await FilterToHexNode.preparePuppeteerBrowser();
        if (errorHandling_1.ErrorHandling.hasError(browser))
            return FilterToHexNode.returnError(browser.errorMessage);
        const page = await FilterToHexNode.openBrowserPage(browser);
        const addSvgResult = await FilterToHexNode.addSVGAndValidateFilter(page, filterString);
        if (errorHandling_1.ErrorHandling.hasError(addSvgResult))
            return FilterToHexNode.returnError(addSvgResult.errorMessage, browser);
        const base64EncodedDataURL = await FilterToHexNode.getImageBase64ViaSVG(page);
        const hexColor = await page.evaluate(shared_1.FilterToHexShared.getColorViaImageDataURL, base64EncodedDataURL);
        FilterToHexNode.cleanup(browser);
        return { color: hexColor };
    }
}
exports.FilterToHexNode = FilterToHexNode;
FilterToHexNode.BASE_64_ENCODING = 'base64';
FilterToHexNode.ENCODED_DATA_URL_PREFIX = `data:image/png;${FilterToHexNode.BASE_64_ENCODING},`;
FilterToHexNode.IS_HEADLESS = true;
// 1px SVG/viewport length is not enough to take a screenshot when headless mode is off, hence it is set to 2px
FilterToHexNode.SVG_SIDE_LENGTH_PX = 2;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/shared.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/shared.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterToHexShared = void 0;
const errorHandling_1 = __webpack_require__(/*! ../../../shared/functionality/errorHandling/errorHandling */ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js");
const colorFormats_1 = __webpack_require__(/*! ../../../shared/consts/colorFormats */ "./node_modules/css-filter-converter/lib/shared/consts/colorFormats.js");
const colorTypes_1 = __webpack_require__(/*! ../../../shared/consts/colorTypes */ "./node_modules/css-filter-converter/lib/shared/consts/colorTypes.js");
class FilterToHexShared {
    static generateInputErrorMessage(filterString) {
        return errorHandling_1.ErrorHandling.generateInputErrorMessage(colorTypes_1.ColorTypes.FILTER, filterString, colorFormats_1.ColorFormats.FILTER);
    }
    // functions are encapsulated within a single method in order to allow them to be executed within the same context
    // of the puppeteer evaluate method
    static addSVGElementsToDOMAndValidateFilter(filterString, svgSideLength = 1) {
        function createSVGElement() {
            const xmlns = 'http://www.w3.org/2000/svg';
            const svgElement = document.createElementNS(xmlns, 'svg');
            svgElement.style.height = 'inherit';
            svgElement.style.width = 'inherit';
            svgElement.style.float = 'left';
            svgElement.style.filter = filterString;
            const rect = document.createElementNS(xmlns, 'rect');
            rect.setAttributeNS(null, 'width', svgSideLength.toString());
            rect.setAttributeNS(null, 'height', svgSideLength.toString());
            svgElement.appendChild(rect);
            return svgElement;
        }
        function createSVGContainerElement() {
            const svgContainerElement = document.createElement('div');
            svgContainerElement.style.height = `${svgSideLength}px`;
            svgContainerElement.style.width = `${svgSideLength}px`;
            svgContainerElement.style.position = 'absolute';
            svgContainerElement.style.top = '0px';
            svgContainerElement.style.left = '0px';
            return svgContainerElement;
        }
        const svgContainerElement = createSVGContainerElement();
        const svgElement = createSVGElement();
        if (svgElement.style.filter === '')
            return { errorMessage: 'error indicator', svgContainerElement };
        svgContainerElement.appendChild(svgElement);
        document.body.appendChild(svgContainerElement);
        return { svgContainerElement };
    }
    // functions are encapsulated within a single method in order to allow them to be executed within the same context
    // of the puppeteer evaluate method
    static async getColorViaImageDataURL(base64EncodedDataURL) {
        function rgbToHex(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw new Error('Invalid color component');
            return ((r << 16) | (g << 8) | b).toString(16);
        }
        function getData(canvasElement) {
            const canvasStartCoordinate = 0;
            const canvasFinalCoordinate = canvasElement.width;
            return canvasElement.getContext('2d').getImageData(canvasStartCoordinate, canvasStartCoordinate, canvasFinalCoordinate, canvasFinalCoordinate).data;
        }
        function getCanvasHexColor(canvasElement) {
            const data = getData(canvasElement);
            const hex = rgbToHex(data[0], data[1], data[2]);
            return `#${`000000${hex}`.slice(-6)}`;
        }
        function createCanvasElement(imageElement) {
            const canvasElement = document.createElement('canvas');
            canvasElement.width = imageElement.width;
            canvasElement.height = imageElement.height;
            canvasElement.getContext('2d').drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
            return canvasElement;
        }
        async function createImage() {
            const imageElement = new Image();
            imageElement.src = base64EncodedDataURL;
            return new Promise((resolve) => {
                setTimeout(() => resolve(imageElement));
            });
        }
        const imageElement = await createImage();
        const canvasElement = createCanvasElement(imageElement);
        return getCanvasHexColor(canvasElement);
    }
}
exports.FilterToHexShared = FilterToHexShared;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers sync recursive ^puppeteer.*$":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers/ sync ^puppeteer.*$ ***!
  \*****************************************************************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/css-filter-converter/lib/filterToColor/filterToHex/workers sync recursive ^puppeteer.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/css-filter-converter/lib/filterToColor/hexToColor/hexToColor.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/filterToColor/hexToColor/hexToColor.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HexToColor = void 0;
const colorFormatter_1 = __webpack_require__(/*! ../../shared/functionality/colorFormatter/colorFormatter */ "./node_modules/css-filter-converter/lib/shared/functionality/colorFormatter/colorFormatter.js");
const color_convert_1 = __importDefault(__webpack_require__(/*! color-convert */ "./node_modules/color-convert/index.js"));
class HexToColor {
    static convertToRgb(color, options) {
        const result = color_convert_1.default.hex.rgb(color);
        return (options === null || options === void 0 ? void 0 : options.resultType) === 'string' ? colorFormatter_1.ColorFormatter.arrayToRgbString(result) : result;
    }
    static convertToHsl(color, options) {
        const result = color_convert_1.default.hex.hsl(color);
        return (options === null || options === void 0 ? void 0 : options.resultType) === 'string' ? colorFormatter_1.ColorFormatter.arrayToHslString(result) : result;
    }
}
exports.HexToColor = HexToColor;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/index.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const colorToFilter_1 = __webpack_require__(/*! ./colorToFilter/colorToFilter */ "./node_modules/css-filter-converter/lib/colorToFilter/colorToFilter.js");
const filterToColor_1 = __webpack_require__(/*! ./filterToColor/filterToColor */ "./node_modules/css-filter-converter/lib/filterToColor/filterToColor.js");
class CssFilterConverter {
    static rgbToFilter(rgbString, options) {
        return colorToFilter_1.ColorToFilter.rgbToFilter(rgbString, options);
    }
    static hexToFilter(hexString, options) {
        return colorToFilter_1.ColorToFilter.hexToFilter(hexString, options);
    }
    static hslToFilter(hslString, options) {
        return colorToFilter_1.ColorToFilter.hslToFilter(hslString, options);
    }
    static keywordToFilter(keyword, options) {
        return colorToFilter_1.ColorToFilter.keywordToFilter(keyword, options);
    }
    static async filterToHex(filterString) {
        return filterToColor_1.FilterToColor.filterToHex(filterString);
    }
    static async filterToRgb(filterString, options) {
        return filterToColor_1.FilterToColor.filterToRgb(filterString, options);
    }
    static async filterToHsl(filterString, options) {
        return filterToColor_1.FilterToColor.filterToHsl(filterString, options);
    }
}
exports["default"] = CssFilterConverter;
module.exports = CssFilterConverter;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/consts/colorFormats.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/consts/colorFormats.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorFormats = void 0;
var ColorFormats;
(function (ColorFormats) {
    ColorFormats["HEX"] = "#ffffff or #fff";
    ColorFormats["RGB"] = "rgb([0-255], [0-255], [0-255]) or rgb([0-255], [0-255], [0-255], [0-1]) or rgb([0-100%], [0-100%], [0-100%]) or rgb([0-100%], [0-100%], [0-100%], [0-100%]) or [0-255], [0-255], [0-255] or [0-255] [0-255] [0-255]";
    ColorFormats["HSL"] = "hsl([0-360], [0-100], [0-100]) or hsl([0-360], [0-100%], [0-100%]) or [0-360], [0-100], [0-100] or [0-360] [0-100] [0-100]";
    ColorFormats["FILTER"] = "blur(), brightness(), contrast(), drop-shadow(), grayscale(), hue-rotate(), invert(), saturate(), sepia() with each parameter populated with %, px or deg where approriate e.g. contrast(101%)";
    ColorFormats["KEYWORD"] = "Generic color string. See the following link for all available colors: https://github.com/colorjs/color-name/blob/master/index.js";
})(ColorFormats = exports.ColorFormats || (exports.ColorFormats = {}));


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/consts/colorTypes.js":
/*!***************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/consts/colorTypes.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorTypes = void 0;
var ColorTypes;
(function (ColorTypes) {
    ColorTypes["HEX"] = "hex";
    ColorTypes["RGB"] = "rgb";
    ColorTypes["HSL"] = "hsl";
    ColorTypes["KEYWORD"] = "keyword";
    ColorTypes["FILTER"] = "filter";
})(ColorTypes = exports.ColorTypes || (exports.ColorTypes = {}));


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/consts/errors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/consts/errors.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// if there are too many new issues being created, change the below variables to the following:
// export const UNEXPECTED_ERROR_MESSAGE_PREFIX =
//   'Unexpected error has occurred, please report this by creating a new issue in the following link: ';
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MUST_INSTALL_PUPPETEER = exports.DEFAULT_CONVERSION_ERROR_MESSAGE = exports.UNEXPECTED_ERROR_MESSAGE_INTRODUCTION = exports.UNEXPECTED_ERROR_MESSAGE_LINK = exports.UNEXPECTED_ERROR_MESSAGE_PREFIX = void 0;
// export const UNEXPECTED_ERROR_MESSAGE_LINK = 'https://github.com/OvidijusParsiunas/css-filter-converter/issues';
exports.UNEXPECTED_ERROR_MESSAGE_PREFIX = 'Unexpected error has occurred, please report this by using the following link: ';
exports.UNEXPECTED_ERROR_MESSAGE_LINK = 'https://github.com/OvidijusParsiunas/css-filter-converter/issues/new';
exports.UNEXPECTED_ERROR_MESSAGE_INTRODUCTION = exports.UNEXPECTED_ERROR_MESSAGE_PREFIX + exports.UNEXPECTED_ERROR_MESSAGE_LINK;
exports.DEFAULT_CONVERSION_ERROR_MESSAGE = 'Input value is invalid';
exports.MUST_INSTALL_PUPPETEER = "To convert filter values to color in Node - you will first need to install 'puppeteer' by running:" +
    ' \n npm install puppeteer';


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/consts/inputLimits.js":
/*!****************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/consts/inputLimits.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAX_COLOR_INPUT_STRING_LENGTH = void 0;
// this is used to prevent regex matcher from evaluating a long string that can be assumed to be incorrect
// currently not applied to filter
exports.MAX_COLOR_INPUT_STRING_LENGTH = 25;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/consts/regex.js":
/*!**********************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/consts/regex.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MATCH_HEXADECIMAL = exports.MATCH_INTEGER_AND_FLOAT_NUMBERS = void 0;
exports.MATCH_INTEGER_AND_FLOAT_NUMBERS = /(-?\d+(?:\.\d+)?)/g;
exports.MATCH_HEXADECIMAL = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/functionality/colorFormatter/colorFormatter.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/functionality/colorFormatter/colorFormatter.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorFormatter = void 0;
class ColorFormatter {
    static arrayToRgbString(rgbArray) {
        return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
    }
    static arrayToHslString(hslArray) {
        return `hsl(${hslArray[0]}deg, ${hslArray[1]}%, ${hslArray[2]}%)`;
    }
}
exports.ColorFormatter = ColorFormatter;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/functionality/errorHandling/errorHandling.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorHandling = void 0;
const errors_1 = __webpack_require__(/*! ../../consts/errors */ "./node_modules/css-filter-converter/lib/shared/consts/errors.js");
class ErrorHandling {
    static generateErrorResult(message) {
        return { color: null, error: { message } };
    }
    static generateInputErrorMessage(colorType, colorString, format) {
        const errorPrefix = `Input ${colorType} color string could not be parsed.`;
        const actualStringReceived = `String received: ${colorString}.`;
        const messageStrings = [errorPrefix, actualStringReceived];
        if (format) {
            const expectedFormat = `Expected format: ${format}.`;
            messageStrings.splice(1, 0, expectedFormat);
        }
        return messageStrings.join(' ');
    }
    static generateUnexpectedError(error) {
        const errorMessage = `${errors_1.UNEXPECTED_ERROR_MESSAGE_INTRODUCTION}: \n${error.message}`;
        return ErrorHandling.generateErrorResult(errorMessage);
    }
    static hasError(param) {
        return !!param.errorMessage;
    }
}
exports.ErrorHandling = ErrorHandling;


/***/ }),

/***/ "./node_modules/css-filter-converter/lib/shared/functionality/sheen/sheenUtil.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/css-filter-converter/lib/shared/functionality/sheen/sheenUtil.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SheenUtil = void 0;
class SheenUtil {
    static parseSheenFromOptions(options) {
        if (options) {
            if (typeof options.sheen === 'boolean')
                return options.sheen;
        }
        return true;
    }
}
exports.SheenUtil = SheenUtil;
SheenUtil.SHEEN_FILTER_PREFIX = 'brightness(0) saturate(100%)';


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/banner.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/banner.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.banner {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content 1fr 50px repeat(2, max-content);
    grid-template-rows: 50px 1fr;
    grid-template-areas: 'icon title count chevron btn2' 
                         'drop-down drop-down drop-down drop-down drop-down';
    align-items: center;
    gap: 5px;
}

.banner img {
    grid-area: icon;
}

.banner p {
    grid-area: title;
    justify-self: start;
}

.banner > span:first-of-type {
    grid-area: count;
    place-self: center;
}

.banner > span:nth-of-type(2) {
    grid-area: chevron;
    padding: 5px;
}

.banner-close-btn {
    color: var(--input);
    grid-area: btn2;
}

.banner-close-btn:hover {
    scale: 1.7;
    color: red;
}

.banner .drop-down {
    grid-area: drop-down;
}


`, "",{"version":3,"sources":["webpack://./src/styles/banner.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,kEAAkE;IAClE,4BAA4B;IAC5B;4EACwE;IACxE,mBAAmB;IACnB,QAAQ;AACZ;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,UAAU;IACV,UAAU;AACd;;AAEA;IACI,oBAAoB;AACxB","sourcesContent":[".banner {\n    position: relative;\n    display: grid;\n    grid-auto-flow: column;\n    grid-template-columns: max-content 1fr 50px repeat(2, max-content);\n    grid-template-rows: 50px 1fr;\n    grid-template-areas: 'icon title count chevron btn2' \n                         'drop-down drop-down drop-down drop-down drop-down';\n    align-items: center;\n    gap: 5px;\n}\n\n.banner img {\n    grid-area: icon;\n}\n\n.banner p {\n    grid-area: title;\n    justify-self: start;\n}\n\n.banner > span:first-of-type {\n    grid-area: count;\n    place-self: center;\n}\n\n.banner > span:nth-of-type(2) {\n    grid-area: chevron;\n    padding: 5px;\n}\n\n.banner-close-btn {\n    color: var(--input);\n    grid-area: btn2;\n}\n\n.banner-close-btn:hover {\n    scale: 1.7;\n    color: red;\n}\n\n.banner .drop-down {\n    grid-area: drop-down;\n}\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/body.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/body.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../background.jpg */ "./src/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    --modal-background: rgba(0,0,0,0.5);
    --input: lightgrey;
    --subtext: darkgrey;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* border: 1px dotted red; */
}

.banner, .card {
	padding: 15px;
    background-color: white;
    border-radius: 14px;
}

.completed {
	text-decoration: line-through;
}

.shadow {
    box-shadow: 0 5px 5px var(--modal-background);
}

.visible {
	display: grid;
}

.modal {
    grid-template-columns: repeat(3, 1fr);
	grid-template-rows: max-content 1fr;
    grid-template-areas: '. content .'
                         '. content .';
}

.modal-content {
    grid-area: content;
    background: linear-gradient(rgb(230, 230, 230,1), rgba(158, 106, 106, 0.7));
}

body {
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,1)), url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    display: grid;
    grid-template-columns: 1fr repeat(2, max(250px, 20%)) 1fr;
    width: 100%;
    min-width: 800px;
    justify-content: center;
    position: relative;
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 2 / span 2;
    grid-template-rows: 100px 1fr 100px;
    grid-template-areas: 'header header' 
                        'main main' 
                        'footer footer';
    min-height: 100vh;
}

header, main, footer {
    background-color: white;
    padding: 20px;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
}

main {
    grid-area: main;
    display: grid;
    grid-template-columns: subgrid;
    gap: 15px;
}

article {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: 30px max-content;
    grid-auto-rows: max-content;
    align-items: start;
    grid-column: span 2;
    gap: 10px;
}

article > div {
    grid-column: inherit;
}`, "",{"version":3,"sources":["webpack://./src/styles/body.css"],"names":[],"mappings":"AAAA;IACI,mCAAmC;IACnC,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;IACV,4BAA4B;AAChC;;AAEA;CACC,aAAa;IACV,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;CACC,6BAA6B;AAC9B;;AAEA;IACI,6CAA6C;AACjD;;AAEA;CACC,aAAa;AACd;;AAEA;IACI,qCAAqC;CACxC,mCAAmC;IAChC;sCACkC;AACtC;;AAEA;IACI,kBAAkB;IAClB,2EAA2E;AAC/E;;AAEA;IACI,oGAAqF;IACrF,aAAa;IACb,yDAAyD;IACzD,WAAW;IACX,gBAAgB;IAChB,uBAAuB;IACvB,kBAAkB;IAClB,aAAa;IACb,8BAA8B;IAC9B,uBAAuB;IACvB,mCAAmC;IACnC;;uCAEmC;IACnC,iBAAiB;AACrB;;AAEA;IACI,uBAAuB;IACvB,aAAa;AACjB;;AAEA;;;;EAIE,oBAAoB;EACpB,eAAe;AACjB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,8BAA8B;IAC9B,SAAS;AACb;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,oCAAoC;IACpC,2BAA2B;IAC3B,kBAAkB;IAClB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,oBAAoB;AACxB","sourcesContent":[":root {\n    --modal-background: rgba(0,0,0,0.5);\n    --input: lightgrey;\n    --subtext: darkgrey;\n}\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    /* border: 1px dotted red; */\n}\n\n.banner, .card {\n\tpadding: 15px;\n    background-color: white;\n    border-radius: 14px;\n}\n\n.completed {\n\ttext-decoration: line-through;\n}\n\n.shadow {\n    box-shadow: 0 5px 5px var(--modal-background);\n}\n\n.visible {\n\tdisplay: grid;\n}\n\n.modal {\n    grid-template-columns: repeat(3, 1fr);\n\tgrid-template-rows: max-content 1fr;\n    grid-template-areas: '. content .'\n                         '. content .';\n}\n\n.modal-content {\n    grid-area: content;\n    background: linear-gradient(rgb(230, 230, 230,1), rgba(158, 106, 106, 0.7));\n}\n\nbody {\n    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,1)), url('../background.jpg');\n    display: grid;\n    grid-template-columns: 1fr repeat(2, max(250px, 20%)) 1fr;\n    width: 100%;\n    min-width: 800px;\n    justify-content: center;\n    position: relative;\n    display: grid;\n    grid-template-columns: subgrid;\n    grid-column: 2 / span 2;\n    grid-template-rows: 100px 1fr 100px;\n    grid-template-areas: 'header header' \n                        'main main' \n                        'footer footer';\n    min-height: 100vh;\n}\n\nheader, main, footer {\n    background-color: white;\n    padding: 20px;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n}\n\nmain {\n    grid-area: main;\n    display: grid;\n    grid-template-columns: subgrid;\n    gap: 15px;\n}\n\narticle {\n    display: grid;\n    grid-template-columns: subgrid;\n    grid-template-rows: 30px max-content;\n    grid-auto-rows: max-content;\n    align-items: start;\n    grid-column: span 2;\n    gap: 10px;\n}\n\narticle > div {\n    grid-column: inherit;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/buttons.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/buttons.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.button {
	cursor: pointer;
}

.del-btn {
	background-color: red;
	color: white;
	border-radius: 5px;
	padding: 0 2px;
}

.del-btn:hover {
	scale: 1.2;
}

.modal-close-btn {
	position: absolute;
	color: white;
	scale: 1.5;
	right: 5px;
	top: 5px;
}`, "",{"version":3,"sources":["webpack://./src/styles/buttons.css"],"names":[],"mappings":"AAAA;CACC,eAAe;AAChB;;AAEA;CACC,qBAAqB;CACrB,YAAY;CACZ,kBAAkB;CAClB,cAAc;AACf;;AAEA;CACC,UAAU;AACX;;AAEA;CACC,kBAAkB;CAClB,YAAY;CACZ,UAAU;CACV,UAAU;CACV,QAAQ;AACT","sourcesContent":[".button {\n\tcursor: pointer;\n}\n\n.del-btn {\n\tbackground-color: red;\n\tcolor: white;\n\tborder-radius: 5px;\n\tpadding: 0 2px;\n}\n\n.del-btn:hover {\n\tscale: 1.2;\n}\n\n.modal-close-btn {\n\tposition: absolute;\n\tcolor: white;\n\tscale: 1.5;\n\tright: 5px;\n\ttop: 5px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/card.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/card.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* icon colors */

.filter-blue {
    filter: invert(17%) sepia(97%) saturate(4457%) hue-rotate(241deg) brightness(115%) contrast(139%);
}

.filter-red {
    filter: invert(26%) sepia(90%) saturate(2174%) hue-rotate(9deg) brightness(99%) contrast(102%);
}

.filter-gray {
    filter: invert(36%) sepia(9%) saturate(1550%) hue-rotate(200deg) brightness(93%) contrast(89%);
}

.filter-green {
    filter: invert(57%) sepia(48%) saturate(661%) hue-rotate(76deg) brightness(93%) contrast(89%);
}

.card {
	display: grid;
    justify-items: center;
	grid-template-rows: repeat(3, 50px);
    align-content: center;
	gap: 5px;
	border: 1px solid var(--subtext);
}

.card p {
    padding: 5px;   
}`, "",{"version":3,"sources":["webpack://./src/styles/card.css"],"names":[],"mappings":"AAAA,gBAAgB;;AAEhB;IACI,iGAAiG;AACrG;;AAEA;IACI,8FAA8F;AAClG;;AAEA;IACI,8FAA8F;AAClG;;AAEA;IACI,6FAA6F;AACjG;;AAEA;CACC,aAAa;IACV,qBAAqB;CACxB,mCAAmC;IAChC,qBAAqB;CACxB,QAAQ;CACR,gCAAgC;AACjC;;AAEA;IACI,YAAY;AAChB","sourcesContent":["/* icon colors */\n\n.filter-blue {\n    filter: invert(17%) sepia(97%) saturate(4457%) hue-rotate(241deg) brightness(115%) contrast(139%);\n}\n\n.filter-red {\n    filter: invert(26%) sepia(90%) saturate(2174%) hue-rotate(9deg) brightness(99%) contrast(102%);\n}\n\n.filter-gray {\n    filter: invert(36%) sepia(9%) saturate(1550%) hue-rotate(200deg) brightness(93%) contrast(89%);\n}\n\n.filter-green {\n    filter: invert(57%) sepia(48%) saturate(661%) hue-rotate(76deg) brightness(93%) contrast(89%);\n}\n\n.card {\n\tdisplay: grid;\n    justify-items: center;\n\tgrid-template-rows: repeat(3, 50px);\n    align-content: center;\n\tgap: 5px;\n\tborder: 1px solid var(--subtext);\n}\n\n.card p {\n    padding: 5px;   \n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/footer.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/footer.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `footer {
    grid-area: footer;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: end; 
    gap: 10px;
}

footer form {
    display: grid;
    grid-template-rows: repeat(7, 50px);
    grid-auto-flow: column;
    align-items: center;
    justify-items: center;
    padding-top: 60px;
}

footer > button {
    border: 0;
    border-radius: 14px;
    padding: 10px;
    width: 200px;
    color: blue;
    display: grid;
    align-items: center;
    justify-items: start;
    gap: 5px;
}

button#new-reminder {
    grid-template-columns: max-content 1fr;

}

button#openListModal {
    height: 70px;
    justify-items: center;
}`, "",{"version":3,"sources":["webpack://./src/styles/footer.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,aAAa;IACb,sBAAsB;IACtB,8BAA8B;IAC9B,gBAAgB;IAChB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,mCAAmC;IACnC,sBAAsB;IACtB,mBAAmB;IACnB,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,SAAS;IACT,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,oBAAoB;IACpB,QAAQ;AACZ;;AAEA;IACI,sCAAsC;;AAE1C;;AAEA;IACI,YAAY;IACZ,qBAAqB;AACzB","sourcesContent":["footer {\n    grid-area: footer;\n    display: grid;\n    grid-auto-flow: column;\n    justify-content: space-between;\n    align-items: end; \n    gap: 10px;\n}\n\nfooter form {\n    display: grid;\n    grid-template-rows: repeat(7, 50px);\n    grid-auto-flow: column;\n    align-items: center;\n    justify-items: center;\n    padding-top: 60px;\n}\n\nfooter > button {\n    border: 0;\n    border-radius: 14px;\n    padding: 10px;\n    width: 200px;\n    color: blue;\n    display: grid;\n    align-items: center;\n    justify-items: start;\n    gap: 5px;\n}\n\nbutton#new-reminder {\n    grid-template-columns: max-content 1fr;\n\n}\n\nbutton#openListModal {\n    height: 70px;\n    justify-items: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/forms.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/forms.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#reminder-modal {
	/* display: grid; */
	min-height: 100vh;
}

#reminder-modal button {
	width: 100px;
}

#reminder-modal button:first-of-type {
	grid-area: done;
	/* justify-self: end; */
}

#reminder-modal button:last-of-type {
	grid-area: reset;
}

#reminder-modal form {
	gap: 30px 0;
	grid-template-columns: minmax(50px, 1fr) 100px 200px minmax(50px, 1fr);
	grid-template-areas:
		'. title titleInput .'
		'. notes notesInput .'
		'. date dateInput .'
		'. time timeInput .'
		'. priority prioritySelect .'
		'. list listSelect .'
		'. done reset .';
}

#reminder-modal label {
    justify-self: end;
}

#reminder-modal input {
	width: 150px;
}

#reminder-modal select {
	text-align: center;
	width: 150px;
}

#reminder-modal label:first-of-type {
	grid-area: title;
}

#reminder-modal label:first-of-type::after {
    content: '*';
    color: red;
}

#reminder-modal input:first-of-type {
	grid-area: titleInput;
}

#reminder-modal label:nth-of-type(2) {
	grid-area: notes;
}

#reminder-modal input:nth-of-type(2) {
	grid-area: notesInput;
}

#reminder-modal label:nth-of-type(3) {
	grid-area: date;
}

#reminder-modal input:nth-of-type(3) {
	grid-area: dateInput;
}

#reminder-modal label:nth-of-type(4) {
	grid-area: time;
}

#reminder-modal input:nth-of-type(4) {
	grid-area: timeInput;
}

#reminder-modal label:nth-of-type(5) {
	grid-area: priority;
}

#reminder-modal select:nth-of-type(1) {
	grid-area: prioritySelect;
}

#reminder-modal label:nth-of-type(6) {
	grid-area: list;
}

#reminder-modal select:nth-of-type(2) {
	grid-area: listSelect;
}

#list-modal form {
    grid-template-areas: '. input input .' 
                         '. color color .' 
                         '. done reset .';
}

#list-modal input:first-of-type {
    width: 250px;
    grid-area: input;
}

#list-modal input:nth-of-type(2) {
    grid-area: color;
}

#list-modal button:first-of-type {
    grid-area: done;
}

#list-modal button:last-of-type {
    grid-area: reset;
}

.modal {
	grid-template-columns: repeat(3, 1fr);
	background-color: var(--modal-background);
	position: absolute;
	inset: 0;
	z-index: 10;
	/* fixes issue with add list button icon showing on top of reminder modal */
}

.modal input {
	padding: 6px;
	border-radius: 12px;
}

input:invalid:focus {
    outline: none;
    border: 1px solid red;
}`, "",{"version":3,"sources":["webpack://./src/styles/forms.css"],"names":[],"mappings":"AAAA;CACC,mBAAmB;CACnB,iBAAiB;AAClB;;AAEA;CACC,YAAY;AACb;;AAEA;CACC,eAAe;CACf,uBAAuB;AACxB;;AAEA;CACC,gBAAgB;AACjB;;AAEA;CACC,WAAW;CACX,sEAAsE;CACtE;;;;;;;kBAOiB;AAClB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;CACC,YAAY;AACb;;AAEA;CACC,kBAAkB;CAClB,YAAY;AACb;;AAEA;CACC,gBAAgB;AACjB;;AAEA;IACI,YAAY;IACZ,UAAU;AACd;;AAEA;CACC,qBAAqB;AACtB;;AAEA;CACC,gBAAgB;AACjB;;AAEA;CACC,qBAAqB;AACtB;;AAEA;CACC,eAAe;AAChB;;AAEA;CACC,oBAAoB;AACrB;;AAEA;CACC,eAAe;AAChB;;AAEA;CACC,oBAAoB;AACrB;;AAEA;CACC,mBAAmB;AACpB;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,eAAe;AAChB;;AAEA;CACC,qBAAqB;AACtB;;AAEA;IACI;;yCAEqC;AACzC;;AAEA;IACI,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;CACC,qCAAqC;CACrC,yCAAyC;CACzC,kBAAkB;CAClB,QAAQ;CACR,WAAW;CACX,2EAA2E;AAC5E;;AAEA;CACC,YAAY;CACZ,mBAAmB;AACpB;;AAEA;IACI,aAAa;IACb,qBAAqB;AACzB","sourcesContent":["#reminder-modal {\n\t/* display: grid; */\n\tmin-height: 100vh;\n}\n\n#reminder-modal button {\n\twidth: 100px;\n}\n\n#reminder-modal button:first-of-type {\n\tgrid-area: done;\n\t/* justify-self: end; */\n}\n\n#reminder-modal button:last-of-type {\n\tgrid-area: reset;\n}\n\n#reminder-modal form {\n\tgap: 30px 0;\n\tgrid-template-columns: minmax(50px, 1fr) 100px 200px minmax(50px, 1fr);\n\tgrid-template-areas:\n\t\t'. title titleInput .'\n\t\t'. notes notesInput .'\n\t\t'. date dateInput .'\n\t\t'. time timeInput .'\n\t\t'. priority prioritySelect .'\n\t\t'. list listSelect .'\n\t\t'. done reset .';\n}\n\n#reminder-modal label {\n    justify-self: end;\n}\n\n#reminder-modal input {\n\twidth: 150px;\n}\n\n#reminder-modal select {\n\ttext-align: center;\n\twidth: 150px;\n}\n\n#reminder-modal label:first-of-type {\n\tgrid-area: title;\n}\n\n#reminder-modal label:first-of-type::after {\n    content: '*';\n    color: red;\n}\n\n#reminder-modal input:first-of-type {\n\tgrid-area: titleInput;\n}\n\n#reminder-modal label:nth-of-type(2) {\n\tgrid-area: notes;\n}\n\n#reminder-modal input:nth-of-type(2) {\n\tgrid-area: notesInput;\n}\n\n#reminder-modal label:nth-of-type(3) {\n\tgrid-area: date;\n}\n\n#reminder-modal input:nth-of-type(3) {\n\tgrid-area: dateInput;\n}\n\n#reminder-modal label:nth-of-type(4) {\n\tgrid-area: time;\n}\n\n#reminder-modal input:nth-of-type(4) {\n\tgrid-area: timeInput;\n}\n\n#reminder-modal label:nth-of-type(5) {\n\tgrid-area: priority;\n}\n\n#reminder-modal select:nth-of-type(1) {\n\tgrid-area: prioritySelect;\n}\n\n#reminder-modal label:nth-of-type(6) {\n\tgrid-area: list;\n}\n\n#reminder-modal select:nth-of-type(2) {\n\tgrid-area: listSelect;\n}\n\n#list-modal form {\n    grid-template-areas: '. input input .' \n                         '. color color .' \n                         '. done reset .';\n}\n\n#list-modal input:first-of-type {\n    width: 250px;\n    grid-area: input;\n}\n\n#list-modal input:nth-of-type(2) {\n    grid-area: color;\n}\n\n#list-modal button:first-of-type {\n    grid-area: done;\n}\n\n#list-modal button:last-of-type {\n    grid-area: reset;\n}\n\n.modal {\n\tgrid-template-columns: repeat(3, 1fr);\n\tbackground-color: var(--modal-background);\n\tposition: absolute;\n\tinset: 0;\n\tz-index: 10;\n\t/* fixes issue with add list button icon showing on top of reminder modal */\n}\n\n.modal input {\n\tpadding: 6px;\n\tborder-radius: 12px;\n}\n\ninput:invalid:focus {\n    outline: none;\n    border: 1px solid red;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/header.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/header.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../icons/magnifying-glass-solid.svg */ "./src/icons/magnifying-glass-solid.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#search {
    background: white url(${___CSS_LOADER_URL_REPLACEMENT_0___}) no-repeat 10px 10px;
    outline: none;
    padding: 10px 35px; 
	border-radius: 14px; 
}

header {
    display: grid;
    grid-area: header;
    align-items: start;
}`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;IACI,6EAAgF;IAChF,aAAa;IACb,kBAAkB;CACrB,mBAAmB;AACpB;;AAEA;IACI,aAAa;IACb,iBAAiB;IACjB,kBAAkB;AACtB","sourcesContent":["#search {\n    background: white url('../icons/magnifying-glass-solid.svg') no-repeat 10px 10px;\n    outline: none;\n    padding: 10px 35px; \n\tborder-radius: 14px; \n}\n\nheader {\n    display: grid;\n    grid-area: header;\n    align-items: start;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/reminder.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/reminder.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.reminder {
    display: grid;
    background-color: var(--card);
    border-top: 1px solid darkgrey;
    grid-template-columns: 50px 100px 1fr max-content;
    grid-template-rows: max-content repeat(3, 1fr);
    grid-template-areas: 'heading heading heading heading' 
                        'checkbox title title closeBtn' 
                        '. notes notes notes' 
                        '. dueDate dueTime priority';
    padding: 10px;
}

.reminder [type='checkbox'] {
    grid-area: checkbox;
    align-self: start;
}

.reminder h4 {
    grid-area: title;
}

.reminder span {
    grid-area: closeBtn;
    align-self: start;
}

.reminder p:nth-of-type(1) {
    grid-area: notes;
    color: var(--subtext);
}

.reminder p:nth-of-type(2) {
    grid-area: dueDate; 
    color: var(--subtext);
}

.reminder p:nth-of-type(3) {
    grid-area: dueTime;
    color: var(--subtext);
}

.reminder p:nth-of-type(4) {
    grid-area: priority;
}

/* SHORT REMINDER */
.reminder-short {
    display: grid;
    padding: 10px;
    border-top: 1px solid darkgrey;
    grid-template-areas: 'checkbox title date time priority button';
    grid-template-columns: max-content 1fr 100px 100px 100px max-content;
    /* justify-items: center; */
}

.reminder-short > input {
    grid-area: checkbox;
}

.reminder-short > h4 {
    grid-area: title;
    justify-self: start;
}

.reminder-short > p:first-of-type {
    grid-area: date;
}

.reminder-short > p:nth-of-type(2) {
    grid-area: time;
}

.reminder-short > p:last-of-type {
    grid-area: priority;
}

.reminder-short > span {
    grid-area: button;
}`, "",{"version":3,"sources":["webpack://./src/styles/reminder.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,6BAA6B;IAC7B,8BAA8B;IAC9B,iDAAiD;IACjD,8CAA8C;IAC9C;;;oDAGgD;IAChD,aAAa;AACjB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,gBAAgB;IAChB,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;AACvB;;AAEA,mBAAmB;AACnB;IACI,aAAa;IACb,aAAa;IACb,8BAA8B;IAC9B,+DAA+D;IAC/D,oEAAoE;IACpE,2BAA2B;AAC/B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;AACrB","sourcesContent":[".reminder {\n    display: grid;\n    background-color: var(--card);\n    border-top: 1px solid darkgrey;\n    grid-template-columns: 50px 100px 1fr max-content;\n    grid-template-rows: max-content repeat(3, 1fr);\n    grid-template-areas: 'heading heading heading heading' \n                        'checkbox title title closeBtn' \n                        '. notes notes notes' \n                        '. dueDate dueTime priority';\n    padding: 10px;\n}\n\n.reminder [type='checkbox'] {\n    grid-area: checkbox;\n    align-self: start;\n}\n\n.reminder h4 {\n    grid-area: title;\n}\n\n.reminder span {\n    grid-area: closeBtn;\n    align-self: start;\n}\n\n.reminder p:nth-of-type(1) {\n    grid-area: notes;\n    color: var(--subtext);\n}\n\n.reminder p:nth-of-type(2) {\n    grid-area: dueDate; \n    color: var(--subtext);\n}\n\n.reminder p:nth-of-type(3) {\n    grid-area: dueTime;\n    color: var(--subtext);\n}\n\n.reminder p:nth-of-type(4) {\n    grid-area: priority;\n}\n\n/* SHORT REMINDER */\n.reminder-short {\n    display: grid;\n    padding: 10px;\n    border-top: 1px solid darkgrey;\n    grid-template-areas: 'checkbox title date time priority button';\n    grid-template-columns: max-content 1fr 100px 100px 100px max-content;\n    /* justify-items: center; */\n}\n\n.reminder-short > input {\n    grid-area: checkbox;\n}\n\n.reminder-short > h4 {\n    grid-area: title;\n    justify-self: start;\n}\n\n.reminder-short > p:first-of-type {\n    grid-area: date;\n}\n\n.reminder-short > p:nth-of-type(2) {\n    grid-area: time;\n}\n\n.reminder-short > p:last-of-type {\n    grid-area: priority;\n}\n\n.reminder-short > span {\n    grid-area: button;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/dom-to-image/src/dom-to-image.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-to-image/src/dom-to-image.js ***!
  \*******************************************************/
/***/ (function(module) {

(function (global) {
    'use strict';

    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();

    // Default impl options
    var defaultOptions = {
        // Default is to fail on error, no placeholder
        imagePlaceholder: undefined,
        // Default cache bust is false, it will use the cache
        cacheBust: false
    };

    var domtoimage = {
        toSvg: toSvg,
        toPng: toPng,
        toJpeg: toJpeg,
        toBlob: toBlob,
        toPixelData: toPixelData,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner,
            options: {}
        }
    };

    if (true)
        module.exports = domtoimage;
    else
        {}


    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options
     * @param {Function} options.filter - Should return true if passed node should be included in the output
     *          (excluding node means excluding it's children as well). Not called on the root node.
     * @param {String} options.bgcolor - color for the background, any valid CSS color value.
     * @param {Number} options.width - width to be applied to node before rendering.
     * @param {Number} options.height - height to be applied to node before rendering.
     * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
     * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
                defaults to 1.0.
     * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
     * @return {Promise} - A promise that is fulfilled with a SVG image data URL
     * */
    function toSvg(node, options) {
        options = options || {};
        copyOptions(options);
        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter, true);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(applyOptions)
            .then(function (clone) {
                return makeSvgDataUri(clone,
                    options.width || util.width(node),
                    options.height || util.height(node)
                );
            });

        function applyOptions(clone) {
            if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

            if (options.width) clone.style.width = options.width + 'px';
            if (options.height) clone.style.height = options.height + 'px';

            if (options.style)
                Object.keys(options.style).forEach(function (property) {
                    clone.style[property] = options.style[property];
                });

            return clone;
        }
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
     * */
    function toPixelData(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.getContext('2d').getImageData(
                    0,
                    0,
                    util.width(node),
                    util.height(node)
                ).data;
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image data URL
     * */
    function toPng(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
     * */
    function toJpeg(node, options) {
        options = options || {};
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL('image/jpeg', options.quality || 1.0);
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options || {})
            .then(util.canvasToBlob);
    }

    function copyOptions(options) {
        // Copy options to impl options for use in impl
        if(typeof(options.imagePlaceholder) === 'undefined') {
            domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
        } else {
            domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
        }

        if(typeof(options.cacheBust) === 'undefined') {
            domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
        } else {
            domtoimage.impl.options.cacheBust = options.cacheBust;
        }
    }

    function draw(domNode, options) {
        return toSvg(domNode, options)
            .then(util.makeImage)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = newCanvas(domNode);
                canvas.getContext('2d').drawImage(image, 0, 0);
                return canvas;
            });

        function newCanvas(domNode) {
            var canvas = document.createElement('canvas');
            canvas.width = options.width || util.width(domNode);
            canvas.height = options.height || util.height(domNode);

            if (options.bgcolor) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = options.bgcolor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            return canvas;
        }
    }

    function cloneNode(node, filter, root) {
        if (!root && filter && !filter(node)) return Promise.resolve();

        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });

        function makeNodeCopy(node) {
            if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
            return node.cloneNode(false);
        }

        function cloneChildren(original, clone, filter) {
            var children = original.childNodes;
            if (children.length === 0) return Promise.resolve(clone);

            return cloneChildrenInOrder(clone, util.asArray(children), filter)
                .then(function () {
                    return clone;
                });

            function cloneChildrenInOrder(parent, children, filter) {
                var done = Promise.resolve();
                children.forEach(function (child) {
                    done = done
                        .then(function () {
                            return cloneNode(child, filter);
                        })
                        .then(function (childClone) {
                            if (childClone) parent.appendChild(childClone);
                        });
                });
                return done;
            }
        }

        function processClone(original, clone) {
            if (!(clone instanceof Element)) return clone;

            return Promise.resolve()
                .then(cloneStyle)
                .then(clonePseudoElements)
                .then(copyUserInput)
                .then(fixSvg)
                .then(function () {
                    return clone;
                });

            function cloneStyle() {
                copyStyle(window.getComputedStyle(original), clone.style);

                function copyStyle(source, target) {
                    if (source.cssText) target.cssText = source.cssText;
                    else copyProperties(source, target);

                    function copyProperties(source, target) {
                        util.asArray(source).forEach(function (name) {
                            target.setProperty(
                                name,
                                source.getPropertyValue(name),
                                source.getPropertyPriority(name)
                            );
                        });
                    }
                }
            }

            function clonePseudoElements() {
                [':before', ':after'].forEach(function (element) {
                    clonePseudoElement(element);
                });

                function clonePseudoElement(element) {
                    var style = window.getComputedStyle(original, element);
                    var content = style.getPropertyValue('content');

                    if (content === '' || content === 'none') return;

                    var className = util.uid();
                    clone.className = clone.className + ' ' + className;
                    var styleElement = document.createElement('style');
                    styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                    clone.appendChild(styleElement);

                    function formatPseudoElementStyle(className, element, style) {
                        var selector = '.' + className + ':' + element;
                        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                        return document.createTextNode(selector + '{' + cssText + '}');

                        function formatCssText(style) {
                            var content = style.getPropertyValue('content');
                            return style.cssText + ' content: ' + content + ';';
                        }

                        function formatCssProperties(style) {

                            return util.asArray(style)
                                .map(formatProperty)
                                .join('; ') + ';';

                            function formatProperty(name) {
                                return name + ': ' +
                                    style.getPropertyValue(name) +
                                    (style.getPropertyPriority(name) ? ' !important' : '');
                            }
                        }
                    }
                }
            }

            function copyUserInput() {
                if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
                if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
            }

            function fixSvg() {
                if (!(clone instanceof SVGElement)) return;
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                if (!(clone instanceof SVGRectElement)) return;
                ['width', 'height'].forEach(function (attribute) {
                    var value = clone.getAttribute(attribute);
                    if (!value) return;

                    clone.style.setProperty(attribute, value);
                });
            }
        }
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function makeSvgDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
            })
            .then(function (svg) {
                return 'data:image/svg+xml;charset=utf-8,' + svg;
            });
    }

    function newUtil() {
        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid(),
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage,
            width: width,
            height: height
        };

        function mimes() {
            /*
             * Only WOFF and EOT mime types for fonts are 'real'
             * see http://www.iana.org/assignments/media-types/media-types.xhtml
             */
            var WOFF = 'application/font-woff';
            var JPEG = 'image/jpeg';

            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }

        function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        function uid() {
            var index = 0;

            return function () {
                return 'u' + fourRandomChars() + index++;

                function fourRandomChars() {
                    /* see http://stackoverflow.com/a/6248722/2519373 */
                    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
                }
            };
        }

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            var TIMEOUT = 30000;
            if(domtoimage.impl.options.cacheBust) {
                // Cache bypass so we dont have CORS issues with cached images
                // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
            }

            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();

                var placeholder;
                if(domtoimage.impl.options.imagePlaceholder) {
                    var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
                    if(split && split[1]) {
                        placeholder = split[1];
                    }
                }

                function done() {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        if(placeholder) {
                            resolve(placeholder);
                        } else {
                            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        }

                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }

                function timeout() {
                    if(placeholder) {
                        resolve(placeholder);
                    } else {
                        fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                    }
                }

                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
        }

        function width(node) {
            var leftBorder = px(node, 'border-left-width');
            var rightBorder = px(node, 'border-right-width');
            return node.scrollWidth + leftBorder + rightBorder;
        }

        function height(node) {
            var topBorder = px(node, 'border-top-width');
            var bottomBorder = px(node, 'border-bottom-width');
            return node.scrollHeight + topBorder + bottomBorder;
        }

        function px(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace('px', ''));
        }
    }

    function newInliner() {
        var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });

            function urlAsRegex(url) {
                return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
            }
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline()) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });

            function nothingToInline() {
                return !shouldProcess(string);
            }
        }
    }

    function newFontFaces() {
        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });

            function selectWebFontRules(cssRules) {
                return cssRules
                    .filter(function (rule) {
                        return rule.type === CSSRule.FONT_FACE_RULE;
                    })
                    .filter(function (rule) {
                        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                    });
            }

            function getCssRules(styleSheets) {
                var cssRules = [];
                styleSheets.forEach(function (sheet) {
                    try {
                        util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                    } catch (e) {
                        console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
                    }
                });
                return cssRules;
            }

            function newWebFont(webFontRule) {
                return {
                    resolve: function resolve() {
                        var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                        return inliner.inlineAll(webFontRule.cssText, baseUrl);
                    },
                    src: function () {
                        return webFontRule.style.getPropertyValue('src');
                    }
                };
            }
        }
    }

    function newImages() {
        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };

        function newImage(element) {
            return {
                inline: inline
            };

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });

            function inlineBackground(node) {
                var background = node.style.getPropertyValue('background');

                if (!background) return Promise.resolve(node);

                return inliner.inlineAll(background)
                    .then(function (inlined) {
                        node.style.setProperty(
                            'background',
                            inlined,
                            node.style.getPropertyPriority('background')
                        );
                    })
                    .then(function () {
                        return node;
                    });
            }
        }
    }
})(this);


/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-badge.svg */ "./src/icons/calendar-badge.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-clock.svg */ "./src/icons/calendar-clock.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-multiselect.svg */ "./src/icons/calendar-multiselect.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-multiple-check.svg */ "./src/icons/calendar-multiple-check.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-text.svg */ "./src/icons/calendar-text.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-plus.svg */ "./src/icons/calendar-plus.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"UTF-8\" />\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n\t<title>To-Do List</title>\n\t<link rel=\"shortcut icon\" href=\"#\" />\n</head>\n<body>\n\t<header>\n\t\t<input id=\"search\" type=\"text\" placeholder=\"Search\" class=\"input\" maxlength=\"50\" />\n\t</header>\n\t<main>\n\t\t<div id=\"today\" class=\"card button modal-btn\">\n\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"\" width=\"50\" height=\"50\" class=\"filter-blue\" />\n\t\t\t<p>Today</p>\n\t\t\t<span class=\"counter\"></span>\n\t\t</div>\n\t\t<div class=\"modal\" hidden>\n\t\t\t\t<span class=\"modal-close-btn button\">&times;</span>\n\t\t\t\t<div class=\"modal-content\"></div>\n\t\t</div>\n\t\t<div id=\"scheduled\" class=\"card button modal-btn\">\n\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"\" width=\"50\" height=\"50\" class=\"filter-red\" />\n\t\t\t<p>Scheduled</p>\n\t\t\t<span class=\"counter\"></span>\n\t\t</div>\n\t\t<div class=\"modal\" hidden>\n\t\t\t\t<span class=\"modal-close-btn button\">&times;</span>\n\t\t\t\t<div class=\"modal-content\"></div>\n\t\t</div>\n\t\t<div id=\"all\" class=\"card button modal-btn\">\n\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"\" width=\"50\" height=\"50\" />\n\t\t\t<p>All</p>\n\t\t\t<span class=\"counter\"></span>\n\t\t</div>\n\t\t<div class=\"modal\" hidden>\n\t\t\t\t<span class=\"modal-close-btn button\">&times;</span>\n\t\t\t\t<div class=\"modal-content\"></div>\n\t\t</div>\n\t\t<div id=\"completed\" class=\"card button modal-btn\">\n\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"\" width=\"50\" height=\"50\" class=\"filter-gray\" />\n\t\t\t<p>Completed</p>\n\t\t\t<span class=\"counter\"></span>\n\t\t</div>\n\t\t<div class=\"modal\" hidden>\n\t\t\t\t<span class=\"modal-close-btn button\">&times;</span>\n\t\t\t\t<div class=\"modal-content\"></div>\n\t\t</div>\n\t\t<article id=\"lists\">\n\t\t\t<h2>My Lists</h2>\n\t\t\t<div id=\"reminder-list\" class=\"button banner shadow\">\n\t\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" width=\"50\" height=\"50\" alt=\"\" class=\"filter-green\" />\n\t\t\t\t<p>Reminders</p>\n\t\t\t\t<span class=\"counter\"></span>\n\t\t\t\t<span class=\"chevron\"></span>\n\t\t\t\t<span class=\"banner-close-btn\">&times;</span>\n\t\t\t\t<div id=\"reminders\" class=\"drop-down\" hidden></div>\n\t\t\t</div>\n\t\t</article>\n\t</main>\n\t<footer>\n\t\t<button id=\"new-reminder\" class=\"button modal-btn shadow\">\n\t\t\t<img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" width=\"50\" height=\"50\" alt=\"\" class=\"filter-blue\" />New Reminder\n\t\t</button>\n\t\t<div id=\"reminder-modal\" class=\"modal\" hidden>\n\t\t\t<span id=\"reminder-modal-close-btn\" class=\"button modal-close-btn\">&times;</span>\n\t\t\t<form id=\"reminderForm\" class=\"modal-content\" action=\"/\">\n\t\t\t\t<label for=\"title\">Title</label>\n\t\t\t\t<input id=\"title\" type=\"text\" placeholder=\"walk dog\" name=\"reminderTitle\" maxlength=\"20\" required />\n\t\t\t\t<label for=\"notes\">Notes</label>\n\t\t\t\t<input id=\"notes\" type=\"text\" name=\"reminderNotes\" maxlength=\"20\" />\n\t\t\t\t<label for=\"date\">Due Date</label>\n\t\t\t\t<input id=\"date\" type=\"date\" name=\"reminderDueDate\" />\n\t\t\t\t<label for=\"time\">Due Time</label>\n\t\t\t\t<input id=\"time\" type=\"time\" name=\"reminderDueTime\" />\n\t\t\t\t<label for=\"priority\">Priority</label>\n\t\t\t\t<select id=\"priority\" name=\"reminderPriority\">\n\t\t\t\t\t<option value=\"1\">low</option>\n\t\t\t\t\t<option value=\"2\" selected>medium</option>\n\t\t\t\t\t<option value=\"3\">high</option>\n\t\t\t\t</select>\n\t\t\t\t<label for=\"list\">List</label>\n\t\t\t\t<select id=\"list\" name=\"listOptions\">\n\t\t\t\t\t<option value=\"reminders\">Reminders</option>\n\t\t\t\t</select>\n\t\t\t\t<button id=\"publishReminder\" type=\"submit\">\n\t\t\t\t\tDone\n\t\t\t\t</button>\n\t\t\t\t<button type=\"reset\">Reset</button>\n\t\t\t</form>\n\t\t</div>\n\t\t<button id=\"openListModal\" class=\"button modal-btn shadow\">\n\t\t\tAdd List\n\t\t</button>\n\t\t<div id=\"list-modal\" class=\"modal\" hidden>\n\t\t\t<span id=\"list-modal-close-btn\" class=\"button modal-close-btn\">&times;</span>\n\t\t\t<form id=\"listForm\" class=\"modal-content\" action=\"/\">\n\t\t\t\t<input type=\"text\" placeholder=\"List name\" maxlength=\"30\" required />\n\t\t\t\t<input type=\"color\" />\n\t\t\t\t<button id=\"addList\" type=\"submit\">Done</button>\n\t\t\t\t<button type=\"reset\">Reset</button>\n\t\t\t</form>\n\t\t</div>\n\t</footer>\n\t<div id=\"edit-reminder\" class=\"modal\" hidden>\n\t\t<div class=\"modal-close-btn button\">&times;</div>\n\t\t<div class=\"modal-content\"></div>\n\t</div>\n</body>\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/styles/banner.css":
/*!*******************************!*\
  !*** ./src/styles/banner.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_banner_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./banner.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/banner.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_banner_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_banner_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_banner_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_banner_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/body.css":
/*!*****************************!*\
  !*** ./src/styles/body.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_body_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./body.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/body.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_body_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_body_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_body_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_body_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/buttons.css":
/*!********************************!*\
  !*** ./src/styles/buttons.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./buttons.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/buttons.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/card.css":
/*!*****************************!*\
  !*** ./src/styles/card.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./card.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/card.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/footer.css":
/*!*******************************!*\
  !*** ./src/styles/footer.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./footer.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/footer.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/forms.css":
/*!******************************!*\
  !*** ./src/styles/forms.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_forms_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./forms.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/forms.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_forms_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_forms_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_forms_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_forms_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/header.css":
/*!*******************************!*\
  !*** ./src/styles/header.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./header.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/header.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/reminder.css":
/*!*********************************!*\
  !*** ./src/styles/reminder.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reminder_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./reminder.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/reminder.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reminder_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reminder_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reminder_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reminder_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/banner.js":
/*!***********************!*\
  !*** ./src/banner.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendBanner: () => (/* binding */ appendBanner),
/* harmony export */   appendChevronIcon: () => (/* binding */ appendChevronIcon),
/* harmony export */   expandCollapseBanner: () => (/* binding */ expandCollapseBanner),
/* harmony export */   removeBanner: () => (/* binding */ removeBanner)
/* harmony export */ });
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icon */ "./src/icon.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list */ "./src/list.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _icons_chevron_down_solid_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/chevron-down-solid.svg */ "./src/icons/chevron-down-solid.svg");
/* harmony import */ var _icons_chevron_up_solid_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/chevron-up-solid.svg */ "./src/icons/chevron-up-solid.svg");
/* harmony import */ var _icons_calendar_text_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/calendar-text.svg */ "./src/icons/calendar-text.svg");








function makeBanner(obj) {    //creates html representation of list

    let wrapper = new DocumentFragment()

    let banner = document.createElement('div')

    banner.classList.add('banner','button','border','shadow')

    let icon = new _icon__WEBPACK_IMPORTED_MODULE_0__.Icon(_icons_calendar_text_svg__WEBPACK_IMPORTED_MODULE_5__, obj.listColor)

    let listIcon = icon.make('list')

    let listName = document.createElement('p')
    
    listName.append(obj.name)

    let count = document.createElement('span')

    count.classList.add('counter')

    let chevron = document.createElement('span')

    chevron.classList.add('chevron')

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('banner-close-btn')
    closeBtn.innerHTML = '&times;'

    let dropDown = document.createElement('div')

    dropDown.classList.add('drop-down')

    dropDown.setAttribute('id',obj.id)

    dropDown.setAttribute('hidden','')

    banner.append(listIcon, listName, count, chevron, closeBtn, dropDown)

    wrapper.append(banner)

    return wrapper
}

function appendChevronIcon(container) {

    let chevronIcon = new _icon__WEBPACK_IMPORTED_MODULE_0__.Icon(_icons_chevron_up_solid_svg__WEBPACK_IMPORTED_MODULE_4__,'#d3d3d3')

    let chevronIcon1 = chevronIcon.make('chevron')

    container.append(chevronIcon1)

}

function removeBanner(e) { //'deletes' list banner

    if(e.target.classList.contains('banner-close-btn')) {

        let banner = e.target.parentElement

        banner.remove()

        let name = banner.lastElementChild.id

        removeListName(name)
    }
}

function removeListName(string) {   //removes name from options in reminder form's select input elem

    let options = document.querySelector('#list').children

    for(let i = 0; i < options.length; i++) {

        if(options[i].value === string) {

            options[i].remove()
        }
    }
}

function addNewListOption(obj) {   //adds new input to reminder modal form

    let container = document.querySelector('[name="listOptions"]')

    let newListOption = document.createElement('option')

    newListOption.setAttribute('value', obj.id)

    newListOption.innerHTML = obj.id

    container.append(newListOption)

}

function appendBanner(e) { //adds new banner to document

    // e.preventDefault()

    (0,_list__WEBPACK_IMPORTED_MODULE_1__.storeList)()

    let listObj = _storage__WEBPACK_IMPORTED_MODULE_2__.lists.at(-1)

    addNewListOption(listObj)

    let newBanner = makeBanner(listObj)

    let container = document.querySelector('article')

    container.append(newBanner)

    listForm.reset()
}

function expandCollapseBanner(e) {

    if(e.target.classList.contains('banner')) {

        let chevronSpan = e.target.children[3]

        if(e.target.lastElementChild.classList.contains('visible')) {

            e.target.lastElementChild.classList.remove('visible')

            if(chevronSpan.firstElementChild) {
                
                chevronSpan.firstElementChild.remove()

                chevronSpan.append(flipChevron('down'))
            }

        }
        
        else {

            e.target.lastElementChild.classList.add('visible')

            if(chevronSpan.firstElementChild) { 

                chevronSpan.firstElementChild.remove()

                chevronSpan.append(flipChevron('up'))

            }
        }
    }
}

function flipChevron(direction) {

    switch(direction) {

        case 'down':
            let chevronIcon1 = new _icon__WEBPACK_IMPORTED_MODULE_0__.Icon(_icons_chevron_down_solid_svg__WEBPACK_IMPORTED_MODULE_3__,'#d3d3d3')
            let icon1 = chevronIcon1.make('chevron')
            return icon1

        case 'up':
            let chevronIcon2 = new _icon__WEBPACK_IMPORTED_MODULE_0__.Icon(_icons_chevron_up_solid_svg__WEBPACK_IMPORTED_MODULE_4__,'#d3d3d3')
            let icon2 = chevronIcon2.make('chevron')
            return icon2
    }
}

/***/ }),

/***/ "./src/completed.js":
/*!**************************!*\
  !*** ./src/completed.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   crossOutCompleted: () => (/* binding */ crossOutCompleted)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/modal.js");
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delete */ "./src/delete.js");
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./counter */ "./src/counter.js");

;





function crossOutCompleted(e) {

	if (e.target.type === 'checkbox') {

        e.target.parentElement.children[1].classList.toggle('completed')
        e.target.parentElement.children[2].classList.toggle('completed')
        e.target.parentElement.children[3].classList.toggle('completed')
        e.target.parentElement.children[4].classList.toggle('completed')

        let reminderName = e.target.parentElement.children[1].innerHTML
        
        checkCompleted(reminderName)

	}

    (0,_counter__WEBPACK_IMPORTED_MODULE_3__.updateModalCounter)('completed')

}

function checkCompleted(reminder) {

    for(let item of _storage__WEBPACK_IMPORTED_MODULE_0__.reminders) {

        if(item.reminderTitle === reminder && item.reminderCompleted === false) {

            item.reminderCompleted = true

            pushCompleted(item)
        }

        else if(item.reminderTitle === reminder && item.reminderCompleted === true) {

            (0,_delete__WEBPACK_IMPORTED_MODULE_2__.deleteFromStorage)(reminder, _storage__WEBPACK_IMPORTED_MODULE_0__.completed)

            ;(0,_modal__WEBPACK_IMPORTED_MODULE_1__.removeFromModal)(reminder, 'completed')

            item.reminderCompleted = false

        }
    }
}

function pushCompleted(reminder) {

    // Array.findIndex()
    function completedTest() {

       let test = _storage__WEBPACK_IMPORTED_MODULE_0__.completed.findIndex(item => item.reminderTitle === reminder)

       return test
    }

    if(completedTest() === -1) _storage__WEBPACK_IMPORTED_MODULE_0__.completed.push(reminder) // tests true if reminder is not found in array

    ;(0,_modal__WEBPACK_IMPORTED_MODULE_1__.showInModal)(reminder, 'completed')

}

/***/ }),

/***/ "./src/counter.js":
/*!************************!*\
  !*** ./src/counter.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateCounter: () => (/* binding */ updateCounter),
/* harmony export */   updateModalCounter: () => (/* binding */ updateModalCounter)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modal.js");

;

function updateCounter(banner) {

    let dropDown = banner.lastElementChild
   
    banner.querySelector('.counter').innerHTML = dropDown.children.length
    
}

function updateModalCounter(modalName) {

    let modalHtml = (0,_modal__WEBPACK_IMPORTED_MODULE_0__.chooseModal)(modalName)

    let counter = modalHtml.parentElement.previousElementSibling.querySelector('.counter')

    counter.innerHTML = modalHtml.children.length
}

/***/ }),

/***/ "./src/delete.js":
/*!***********************!*\
  !*** ./src/delete.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteFromStorage: () => (/* binding */ deleteFromStorage),
/* harmony export */   deleteReminderHtml: () => (/* binding */ deleteReminderHtml)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counter */ "./src/counter.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./src/modal.js");



 

function deleteReminderHtml(e) {

    if(e.target.classList.contains('del-btn')) {

        let btn = e.target
    
        let reminder = btn.parentElement

        let banner = reminder.parentElement.parentElement

        let reminderName = reminder.children[1].innerHTML

        deleteFromStorage(reminderName, _storage__WEBPACK_IMPORTED_MODULE_0__.reminders)
        
        reminder.remove()

        ;(0,_modal__WEBPACK_IMPORTED_MODULE_2__.removeFromModal)(reminderName, 'all')

        ;(0,_modal__WEBPACK_IMPORTED_MODULE_2__.removeFromModal)(reminderName, 'completed')

        ;(0,_counter__WEBPACK_IMPORTED_MODULE_1__.updateCounter)(banner)

        ;(0,_counter__WEBPACK_IMPORTED_MODULE_1__.updateModalCounter)('all')

    }
}

function deleteFromStorage(reminder, array) {    //removes from array

    // Array.indexOf()
    for(let item of array) {

        if(item.reminderTitle === reminder) {

            let index = array.indexOf(item)

            array.splice(index, 1)

        }
    }
}

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   editReminder: () => (/* binding */ editReminder)
/* harmony export */ });


function editReminder(e) {

    if(e.target.classList.contains('reminder-short')) {

        document.querySelector('#edit-reminder').classList.toggle('visible')
    }
}

/***/ }),

/***/ "./src/icon.js":
/*!*********************!*\
  !*** ./src/icon.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Icon: () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var css_filter_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-filter-converter */ "./node_modules/css-filter-converter/lib/index.js");
/* harmony import */ var css_filter_converter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(css_filter_converter__WEBPACK_IMPORTED_MODULE_0__);



class Icon {

    constructor(src, color) {

        this._src = src
        this._color = css_filter_converter__WEBPACK_IMPORTED_MODULE_0___default().hexToFilter(color).color
    }

    make(type) {

        switch(type) {
            
            case 'list':
                let icon = new Image(50,50)
                icon.src = this._src
                icon.style.filter = this._color
                return icon

            case 'chevron':
                let icon2 = new Image(15,15)
                icon2.src = this._src
                icon2.style.filter = this._color
                return icon2
        }
    }
}

/***/ }),

/***/ "./src/list.js":
/*!*********************!*\
  !*** ./src/list.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storeList: () => (/* binding */ storeList)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");



class List {
    constructor({name = 'New List', color = '#0f0'}={}) {
        this._name = name
        this.listColor = color
    }

    get name() {

        return this._name
    }

    set name(str) {

       if (str === '') this._name = 'New List'
       else this._name = str
    }

    get id() {
        return this.camelCase(this.name)
    }

    // for ID
    camelCase(str) {

        let splitted = str.split(' ')   //array

        let camelized = splitted.map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1))

        let newStr = camelized.join('')

        return newStr
    }

}

function storeList() {

    _storage__WEBPACK_IMPORTED_MODULE_0__.lists.push(getListInputs())
}

function getListInputs() {   //creates obj from list modal inputs, returns obj

    let obj = new List()

    obj.name = document.querySelector("[placeholder='List name']").value.trim()

    obj.listColor = document.querySelector("[type='color']").value

    return obj
}

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chooseModal: () => (/* binding */ chooseModal),
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   openModal: () => (/* binding */ openModal),
/* harmony export */   removeFromModal: () => (/* binding */ removeFromModal),
/* harmony export */   showInModal: () => (/* binding */ showInModal)
/* harmony export */ });
/* harmony import */ var _reminder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reminder */ "./src/reminder.js");

;

function chooseModal(name) {    //returns appropriate html element

    switch(name) {
        case 'today':
            return document.querySelector('#today + .modal .modal-content')
        case 'scheduled':
            return document.querySelector('#scheduled + .modal .modal-content')
        case 'all':
            return document.querySelector('#all + .modal .modal-content')
        case 'completed':
            return document.querySelector('#completed + .modal .modal-content')
    }
}

function closeModal(e) {

    if(e.target.classList.contains('modal')) {

         e.target.classList.remove('visible')
    }

    else if (e.target.classList.contains('modal-close-btn')) {

        e.target.closest('.modal').classList.remove('visible')
    }

}

function openModal(e) { //show modal

    if(e.target.classList.contains('modal-btn')) {

        e.target.nextElementSibling.classList.add('visible')
    }
}

function showInModal(reminder, modalName) {

    let modalHtml = chooseModal(modalName)

    modalHtml.append((0,_reminder__WEBPACK_IMPORTED_MODULE_0__.reminderForModal)(reminder))

}

function removeFromModal(reminder, modalName) {

    let modalHtml = chooseModal(modalName)

    for(let item of modalHtml.children) {

        if(item.attributes[0].value === reminder) {    // data-title == <reminder's title>

            item.remove()
        }
    }
}

/***/ }),

/***/ "./src/reminder.js":
/*!*************************!*\
  !*** ./src/reminder.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Reminder: () => (/* binding */ Reminder),
/* harmony export */   publishReminder: () => (/* binding */ publishReminder),
/* harmony export */   reminderForModal: () => (/* binding */ reminderForModal)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _banner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./banner */ "./src/banner.js");
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./counter */ "./src/counter.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ "./src/modal.js");

;




class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="reminders", today=false, scheduled=false, all=true, completed=false} = {}) {
        this.reminderTitle = title
        this.reminderNotes = notes
        this.reminderDueDate = dueDate
        this.reminderDueTime = dueTime
        this.reminderPriority = priority
        this.reminderList = list
        this.reminderToday = today
        this.reminderScheduled = scheduled
        this.reminderAll = all
        this.reminderCompleted = completed
    }

    get listId() {
        return '#' + this.reminderList
    }

    set list(name) {
        this.reminderList = name
    }

}

function getReminderData() { //gets inputs from reminder form, makes new obj

    let title = document.querySelector('#reminderForm input:first-of-type').value

    let notes = document.querySelector('#reminderForm input:nth-of-type(2)').value

    let dueDate = document.querySelector('#reminderForm input:nth-of-type(3)').value

    let dueTime = document.querySelector('#reminderForm input:nth-of-type(4)').value

    let priority = document.querySelector('#reminderForm select:first-of-type').value

    let list = document.querySelector('#reminderForm select:nth-of-type(2)').value

    return new Reminder({title,notes,dueDate,dueTime,priority,list})
}

function storeReminder() {

    _storage__WEBPACK_IMPORTED_MODULE_0__.reminders.push(getReminderData())

    // console.log(reminderStorage)
}



function makeShortReminder(obj) {   //makes reminder html to be shown in list accordion

    let box = document.createElement('div')

    box.classList.add('reminder-short')

    let wrapper = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let title = document.createElement('h4')

    title.innerHTML = obj.reminderTitle

    // let notes = document.createElement('p')

    // notes.innerHTML = obj.reminderNotes

    let date = document.createElement('p')

    date.innerHTML = obj.reminderDueDate

    let time = document.createElement('p')

    time.innerHTML = obj.reminderDueTime

    let priority = document.createElement('p')

    priority.innerHTML = obj.reminderPriority

    let button = document.createElement('span')

    button.classList.add('button','del-btn')

    button.innerHTML = '&times;'

    wrapper.push(checkbox,title,date,time,priority,button)

    box.append(...wrapper)

    return box
}

function reminderForModal(obj) { 

    let reminderHtmlWrapper = document.createElement('div')

    reminderHtmlWrapper.setAttribute('data-title', obj.reminderTitle)

    reminderHtmlWrapper.classList.add('reminder')

    let reminderHtmlContent = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.reminderTitle

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','del-btn')

    closeBtn.innerHTML = '&times;'

    let reminderNotes = document.createElement('p')

    reminderNotes.innerHTML = obj.reminderNotes

    let reminderDueDate = document.createElement('p')

    reminderDueDate.innerHTML = obj.reminderDueDate

    let reminderDueTime = document.createElement('p')

    reminderDueTime.innerHTML = obj.reminderDueTime

    let reminderPriority = document.createElement('p')

    reminderPriority.innerHTML = obj.reminderPriority

    // let reminderListId = "#" + obj.list

    // let container = document.querySelector(reminderListId)

    reminderHtmlContent.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    reminderHtmlWrapper.append(...reminderHtmlContent)

    return reminderHtmlWrapper

}

function publishReminder(test) {

   return function(e) { 

        if(test) {  //test function

            e.preventDefault()

            let defaultList = document.querySelector('#reminders')

            defaultList.append(makeShortReminder(new Reminder()))

            return
        }

            e.preventDefault()
    
            storeReminder()

            let reminder = _storage__WEBPACK_IMPORTED_MODULE_0__.reminders.at(-1) //last reminder added

            let list = reminder.listId

            let dropDown = document.querySelector(list)

            let banner = dropDown.parentElement
    
            if(dropDown.childElementCount === 0) { //shows drop-down by default after adding first reminder
        
                let chevronSpan = banner.children[3]
    
                if(!chevronSpan.firstChild) {   //prevents adding extra chevron icons (bug)
    
                    (0,_banner__WEBPACK_IMPORTED_MODULE_1__.appendChevronIcon)(chevronSpan)
    
                }
                
                document.querySelector(list).classList.add('visible')
            }

            dropDown.append(makeShortReminder(reminder))

            ;(0,_modal__WEBPACK_IMPORTED_MODULE_3__.showInModal)(reminder, 'all')

            ;(0,_counter__WEBPACK_IMPORTED_MODULE_2__.updateModalCounter)('all')
        
            ;(0,_counter__WEBPACK_IMPORTED_MODULE_2__.updateCounter)(banner)
    
            reminderForm.reset()
    }

}

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   completed: () => (/* binding */ completed),
/* harmony export */   lists: () => (/* binding */ lists),
/* harmony export */   reminders: () => (/* binding */ reminders)
/* harmony export */ });


let lists = []

let reminders = []

let completed = []

/***/ }),

/***/ "./src/testing.js":
/*!************************!*\
  !*** ./src/testing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   testReminder: () => (/* binding */ testReminder)
/* harmony export */ });
/* harmony import */ var _reminder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reminder */ "./src/reminder.js");



function testReminder() {

    document.querySelector('button#publishReminder').addEventListener('click', (0,_reminder__WEBPACK_IMPORTED_MODULE_0__.publishReminder)(1))

    let clickEvent = new Event('click')

    document.querySelector('#publishReminder').dispatchEvent(clickEvent)

    document.querySelector('#reminders').classList.add('visible')
}

// document.querySelector('#list-modal').classList.add('visible')  

// addList.dispatchEvent(clickEvent)


/***/ }),

/***/ "./src/background.jpg":
/*!****************************!*\
  !*** ./src/background.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "999161b5b855d9447884.jpg";

/***/ }),

/***/ "./src/icons/calendar-badge.svg":
/*!**************************************!*\
  !*** ./src/icons/calendar-badge.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cb0e65bd516b4b5f5d06.svg";

/***/ }),

/***/ "./src/icons/calendar-clock.svg":
/*!**************************************!*\
  !*** ./src/icons/calendar-clock.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0afa66342b0e5f53443f.svg";

/***/ }),

/***/ "./src/icons/calendar-multiple-check.svg":
/*!***********************************************!*\
  !*** ./src/icons/calendar-multiple-check.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "61238fdaf03dcdcfb315.svg";

/***/ }),

/***/ "./src/icons/calendar-multiselect.svg":
/*!********************************************!*\
  !*** ./src/icons/calendar-multiselect.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7c08cb4f6d6cfe3d09d7.svg";

/***/ }),

/***/ "./src/icons/calendar-plus.svg":
/*!*************************************!*\
  !*** ./src/icons/calendar-plus.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ab58307c4579e18946a8.svg";

/***/ }),

/***/ "./src/icons/calendar-text.svg":
/*!*************************************!*\
  !*** ./src/icons/calendar-text.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "219cb3f5774dc4da59ea.svg";

/***/ }),

/***/ "./src/icons/chevron-down-solid.svg":
/*!******************************************!*\
  !*** ./src/icons/chevron-down-solid.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "19f60b34ab6ecc29fee4.svg";

/***/ }),

/***/ "./src/icons/chevron-up-solid.svg":
/*!****************************************!*\
  !*** ./src/icons/chevron-up-solid.svg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c1c53dda3ab61ae3f7d2.svg";

/***/ }),

/***/ "./src/icons/magnifying-glass-solid.svg":
/*!**********************************************!*\
  !*** ./src/icons/magnifying-glass-solid.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b14bca73eabe5fd35b88.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _styles_body_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/body.css */ "./src/styles/body.css");
/* harmony import */ var _styles_buttons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/buttons.css */ "./src/styles/buttons.css");
/* harmony import */ var _styles_banner_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/banner.css */ "./src/styles/banner.css");
/* harmony import */ var _styles_card_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/card.css */ "./src/styles/card.css");
/* harmony import */ var _styles_forms_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/forms.css */ "./src/styles/forms.css");
/* harmony import */ var _styles_header_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/header.css */ "./src/styles/header.css");
/* harmony import */ var _styles_footer_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/footer.css */ "./src/styles/footer.css");
/* harmony import */ var _styles_reminder_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styles/reminder.css */ "./src/styles/reminder.css");
/* harmony import */ var _reminder_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./reminder.js */ "./src/reminder.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modal */ "./src/modal.js");
/* harmony import */ var _banner_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./banner.js */ "./src/banner.js");
/* harmony import */ var _completed_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./completed.js */ "./src/completed.js");
/* harmony import */ var _delete_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./delete.js */ "./src/delete.js");
/* harmony import */ var _testing_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./testing.js */ "./src/testing.js");
/* harmony import */ var _edit_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./edit.js */ "./src/edit.js");

















(0,_testing_js__WEBPACK_IMPORTED_MODULE_14__.testReminder)()

// EVENT LISTENERS
let publishReminderBtn = document.querySelector('button#publishReminder')

// publishReminderBtn.addEventListener('click', publishReminder())

let addListBtn = document.querySelector('button#addList')

addListBtn.addEventListener('click', _banner_js__WEBPACK_IMPORTED_MODULE_11__.appendBanner)

document.addEventListener('click', _banner_js__WEBPACK_IMPORTED_MODULE_11__.expandCollapseBanner)

document.addEventListener('click', _delete_js__WEBPACK_IMPORTED_MODULE_13__.deleteReminderHtml)

document.addEventListener('click', _modal__WEBPACK_IMPORTED_MODULE_10__.closeModal)

document.addEventListener('click', _modal__WEBPACK_IMPORTED_MODULE_10__.openModal)

document.addEventListener('click', _banner_js__WEBPACK_IMPORTED_MODULE_11__.removeBanner)

document.addEventListener('click', _completed_js__WEBPACK_IMPORTED_MODULE_12__.crossOutCompleted)

document.addEventListener('click', _edit_js__WEBPACK_IMPORTED_MODULE_15__.editReminder)

})();

/******/ })()
;
//# sourceMappingURL=main.js.map