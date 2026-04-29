// data.jsx — Category definitions, units, and conversion math

// Color palette — vibrant, playful tiles
const CATEGORY_COLORS = {
  distance:    { bg: '#10B981', soft: '#D1FAE5', deep: '#047857' }, // emerald
  area:        { bg: '#6366F1', soft: '#E0E7FF', deep: '#4338CA' }, // indigo
  weight:      { bg: '#EF4444', soft: '#FEE2E2', deep: '#B91C1C' }, // red
  temperature: { bg: '#F97316', soft: '#FFEDD5', deep: '#C2410C' }, // orange
  fuel:        { bg: '#EC4899', soft: '#FCE7F3', deep: '#BE185D' }, // pink
  speed:       { bg: '#8B5CF6', soft: '#EDE9FE', deep: '#6D28D9' }, // violet
  time:        { bg: '#F59E0B', soft: '#FEF3C7', deep: '#B45309' }, // amber
  cooking:     { bg: '#14B8A6', soft: '#CCFBF1', deep: '#0F766E' }, // teal
  currency:    { bg: '#22C55E', soft: '#DCFCE7', deep: '#15803D' }, // green
  height:      { bg: '#0EA5E9', soft: '#E0F2FE', deep: '#0369A1' }, // sky
  volume:      { bg: '#D946EF', soft: '#FAE8FF', deep: '#A21CAF' }, // fuchsia
  data:        { bg: '#0891B2', soft: '#CFFAFE', deep: '#155E75' }, // cyan
};

// SVG icons (line-filled, white, playful)
const ICONS = {
  distance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  area: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <path d="M3 8h18M8 3v18"/>
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 7h11l1.5 13H5L6.5 7z"/>
      <path d="M9 7a3 3 0 016 0"/>
    </svg>
  ),
  temperature: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4 4 0 105 0z"/>
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h12V5a2 2 0 00-2-2H5a2 2 0 00-2 2v16z"/>
      <path d="M15 9h2a2 2 0 012 2v5a2 2 0 11-4 0"/>
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20a8 8 0 100-16 8 8 0 000 16z"/>
      <path d="M12 12l4-4"/>
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  cooking: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11h16l-1.5 9h-13L4 11z"/>
      <path d="M7 11V8a5 5 0 0110 0v3"/>
      <path d="M9 4c.5-1 1.5-1 2 0M13 4c.5-1 1.5-1 2 0"/>
    </svg>
  ),
  currency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M15 9a3 3 0 00-3-1c-1.5 0-3 .8-3 2.2 0 3 6 1.6 6 4.6 0 1.4-1.5 2.2-3 2.2a3 3 0 01-3-1"/>
      <path d="M12 7v10"/>
    </svg>
  ),
  height: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M7 6l5-3 5 3M7 18l5 3 5-3"/>
    </svg>
  ),
  volume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h10l-1 4H8L7 3z"/>
      <path d="M8 7l-1 14h10l-1-14"/>
      <path d="M9 14c1-1 2-1 3 0s2 1 3 0"/>
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3"/>
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/>
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
    </svg>
  ),
  swap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4v16M7 4l-3 3M7 4l3 3"/>
      <path d="M17 20V4M17 20l-3-3M17 20l3-3"/>
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
};

// ─── Conversions ────────────────────────────────────────────
// Each category defines units. Simple categories use a `factor` to base unit.
// Non-linear categories (temperature, cooking) use custom toBase/fromBase.

const CATEGORIES = {
  distance: {
    name: 'Length',
    base: 'm',
    defaults: ['km', 'mi'],
    units: [
      { id: 'mm', label: 'Millimetre',  short: 'mm',  factor: 0.001 },
      { id: 'cm', label: 'Centimetre',  short: 'cm',  factor: 0.01 },
      { id: 'm',  label: 'Metre',       short: 'm',   factor: 1 },
      { id: 'km', label: 'Kilometre',   short: 'km',  factor: 1000 },
      { id: 'in', label: 'Inch',        short: 'in',  factor: 0.0254 },
      { id: 'ft', label: 'Foot',        short: 'ft',  factor: 0.3048 },
      { id: 'yd', label: 'Yard',        short: 'yd',  factor: 0.9144 },
      { id: 'mi', label: 'Mile',        short: 'mi',  factor: 1609.344 },
      { id: 'nmi', label: 'Nautical mile', short: 'nmi', factor: 1852 },
    ],
  },
  area: {
    name: 'Area',
    base: 'm2',
    defaults: ['km2', 'acre'],
    units: [
      { id: 'mm2', label: 'Sq Millimetre', short: 'mm²', factor: 1e-6 },
      { id: 'cm2', label: 'Sq Centimetre', short: 'cm²', factor: 1e-4 },
      { id: 'm2',  label: 'Sq Metre',      short: 'm²',  factor: 1 },
      { id: 'ha',  label: 'Hectare',       short: 'ha',  factor: 10000 },
      { id: 'km2', label: 'Sq Kilometre',  short: 'km²', factor: 1e6 },
      { id: 'in2', label: 'Sq Inch',       short: 'in²', factor: 0.00064516 },
      { id: 'ft2', label: 'Sq Foot',       short: 'ft²', factor: 0.092903 },
      { id: 'yd2', label: 'Sq Yard',       short: 'yd²', factor: 0.836127 },
      { id: 'acre',label: 'Acre',          short: 'ac',  factor: 4046.856 },
      { id: 'mi2', label: 'Sq Mile',       short: 'mi²', factor: 2589988.11 },
    ],
  },
  weight: {
    name: 'Weight',
    base: 'g',
    defaults: ['kg', 'st_lb'],
    units: [
      { id: 'mg',    label: 'Milligram',  short: 'mg',  factor: 0.001 },
      { id: 'g',     label: 'Gram',       short: 'g',   factor: 1 },
      { id: 'kg',    label: 'Kilogram',   short: 'kg',  factor: 1000 },
      { id: 't',     label: 'Tonne',      short: 't',   factor: 1e6 },
      { id: 'oz',    label: 'Ounce',      short: 'oz',  factor: 28.3495 },
      { id: 'lb',    label: 'Pound',      short: 'lb',  factor: 453.592 },
      { id: 'st_lb', label: 'Stones & Pounds', short: 'st.lb' },
      { id: 'ton_uk',label: 'UK Ton',     short: 'long tn', factor: 1016046.91 },
      { id: 'ton_us',label: 'US Ton',     short: 'short tn', factor: 907184.74 },
    ],
    // Custom because st_lb is a composite unit encoded as ST.LB (e.g. 11.5 = 11 stones 5 pounds)
    toBase: (v, u) => {
      if (u === 'st_lb') {
        const stones = Math.trunc(v);
        // Decimal portion is pounds (0.00–0.13). Multiply by 100 to recover the integer pounds entered.
        // Use rounding to avoid float artefacts (e.g. 11.5 → 50, .12 → 12).
        const lbs = Math.round((Math.abs(v) - Math.abs(stones)) * 100) * (v < 0 ? -1 : 1);
        return (stones * 14 + lbs) * 453.592;
      }
      const unit = CATEGORIES.weight.units.find(x => x.id === u);
      return v * unit.factor;
    },
    fromBase: (v, u) => {
      if (u === 'st_lb') {
        // Convert grams → total pounds, split into stones + remaining pounds (0–13).
        const totalLb = v / 453.592;
        const sign = totalLb < 0 ? -1 : 1;
        const abs = Math.abs(totalLb);
        const stones = Math.floor(abs / 14);
        const lbs = Math.round(abs - stones * 14);
        // Handle carry (e.g. 13.6 lb rounds to 14 → next stone)
        if (lbs === 14) return sign * (stones + 1);
        // Encode as ST.LL (lbs zero-padded to 2 digits in the decimal).
        const pad = lbs < 10 ? `0${lbs}` : `${lbs}`;
        return sign * Number(`${stones}.${pad}`);
      }
      const unit = CATEGORIES.weight.units.find(x => x.id === u);
      return v / unit.factor;
    },
  },
  temperature: {
    name: 'Temperature',
    base: 'c',
    defaults: ['f', 'c'],
    units: [
      { id: 'c', label: 'Celsius',    short: '°C' },
      { id: 'f', label: 'Fahrenheit', short: '°F' },
      { id: 'k', label: 'Kelvin',     short: 'K'  },
    ],
    toBase: (v, u) => u === 'c' ? v : u === 'f' ? (v - 32) * 5/9 : v - 273.15,
    fromBase: (v, u) => u === 'c' ? v : u === 'f' ? v * 9/5 + 32 : v + 273.15,
  },
  fuel: {
    name: 'Fuel Economy',
    base: 'kmpl',
    defaults: ['mpg_uk', 'kmpl'],
    units: [
      { id: 'kmpl',   label: 'Kilometres / Litre', short: 'km/L' },
      { id: 'l100',   label: 'Litres / 100 km',    short: 'L/100km' },
      { id: 'mpg_us', label: 'Miles / Gallon (US)',short: 'mpg (US)' },
      { id: 'mpg_uk', label: 'Miles / Gallon (UK)',short: 'mpg (UK)' },
    ],
    // "base" is km/L. Values with L/100 are inverse relations.
    toBase: (v, u) => {
      if (!v) return 0;
      if (u === 'kmpl') return v;
      if (u === 'l100') return 100 / v;
      if (u === 'mpg_us') return v * 0.425144;
      if (u === 'mpg_uk') return v * 0.354006;
    },
    fromBase: (v, u) => {
      if (!v) return 0;
      if (u === 'kmpl') return v;
      if (u === 'l100') return 100 / v;
      if (u === 'mpg_us') return v / 0.425144;
      if (u === 'mpg_uk') return v / 0.354006;
    },
  },
  speed: {
    name: 'Speed',
    base: 'mps',
    defaults: ['kmh', 'mph'],
    units: [
      { id: 'mps', label: 'Metre / Second',     short: 'm/s', factor: 1 },
      { id: 'kmh', label: 'Kilometre / Hour',   short: 'km/h',factor: 0.277778 },
      { id: 'mph', label: 'Mile / Hour',        short: 'mph', factor: 0.44704 },
      { id: 'fps', label: 'Foot / Second',      short: 'ft/s',factor: 0.3048 },
      { id: 'kn',  label: 'Knot',               short: 'kn',  factor: 0.514444 },
    ],
  },
  time: {
    name: 'Time',
    base: 's',
    defaults: ['min', 'h'],
    units: [
      { id: 'ms',  label: 'Millisecond', short: 'ms', factor: 0.001 },
      { id: 's',   label: 'Second',      short: 's',  factor: 1 },
      { id: 'min', label: 'Minute',      short: 'min',factor: 60 },
      { id: 'h',   label: 'Hour',        short: 'h',  factor: 3600 },
      { id: 'd',   label: 'Day',         short: 'd',  factor: 86400 },
      { id: 'wk',  label: 'Week',        short: 'wk', factor: 604800 },
      { id: 'mo',  label: 'Month',       short: 'mo', factor: 2629800 },
      { id: 'yr',  label: 'Year',        short: 'yr', factor: 31557600 },
    ],
  },
  cooking: {
    name: 'Cooking',
    base: 'c',
    defaults: ['gas', 'c'],
    units: [
      { id: 'c',   label: 'Celsius',    short: '°C' },
      { id: 'f',   label: 'Fahrenheit', short: '°F' },
      { id: 'gas', label: 'Gas Mark',   short: 'Gas' },
    ],
    // Base = Celsius. Gas marks: 1/4 ≈ 110°C, 1/2 ≈ 120°C, 1=140, 2=150, 3=170, 4=180, 5=190, 6=200, 7=220, 8=230, 9=240
    toBase: (v, u) => {
      if (u === 'c') return v;
      if (u === 'f') return (v - 32) * 5/9;
      if (u === 'gas') {
        // Linear-ish: from gas 1 (140°C) step +10 per mark above, with quarter/half below
        if (v <= 0.25) return 110;
        if (v <= 0.5) return 120;
        if (v >= 1) return 130 + v * 10;
        // Interpolate between 0.5 (120) and 1 (140)
        return 120 + (v - 0.5) * 40;
      }
    },
    fromBase: (v, u) => {
      if (u === 'c') return v;
      if (u === 'f') return v * 9/5 + 32;
      if (u === 'gas') {
        if (v <= 110) return 0.25;
        if (v <= 120) return 0.5;
        return Math.max(0.25, (v - 130) / 10);
      }
    },
  },
  currency: {
    name: 'Currency',
    base: 'usd',
    defaults: ['usd', 'eur'],
    // Static rates — labelled as indicative. User said "live rates feel" was not selected, so we note rates as of today.
    units: [
      { id: 'usd', label: 'US Dollar',       short: 'USD', factor: 1 },
      { id: 'eur', label: 'Euro',            short: 'EUR', factor: 1.08 },
      { id: 'gbp', label: 'British Pound',   short: 'GBP', factor: 1.26 },
      { id: 'jpy', label: 'Japanese Yen',    short: 'JPY', factor: 0.0067 },
      { id: 'cad', label: 'Canadian Dollar', short: 'CAD', factor: 0.73 },
      { id: 'aud', label: 'Australian Dollar',short:'AUD', factor: 0.66 },
      { id: 'chf', label: 'Swiss Franc',     short: 'CHF', factor: 1.12 },
      { id: 'cny', label: 'Chinese Yuan',    short: 'CNY', factor: 0.14 },
      { id: 'inr', label: 'Indian Rupee',    short: 'INR', factor: 0.012 },
      { id: 'mxn', label: 'Mexican Peso',    short: 'MXN', factor: 0.058 },
    ],
  },
  volume: {
    name: 'Volume',
    base: 'l',
    defaults: ['l', 'gal_us'],
    units: [
      { id: 'ml',     label: 'Millilitre',    short: 'mL',   factor: 0.001 },
      { id: 'l',      label: 'Litre',         short: 'L',    factor: 1 },
      { id: 'm3',     label: 'Cubic Metre',   short: 'm³',   factor: 1000 },
      { id: 'tsp',    label: 'Teaspoon',      short: 'tsp',  factor: 0.00492892 },
      { id: 'tbsp',   label: 'Tablespoon',    short: 'tbsp', factor: 0.0147868 },
      { id: 'cup',    label: 'Cup (US)',      short: 'cup',  factor: 0.236588 },
      { id: 'pt_us',  label: 'Pint (US)',     short: 'pt',   factor: 0.473176 },
      { id: 'qt_us',  label: 'Quart (US)',    short: 'qt',   factor: 0.946353 },
      { id: 'gal_us', label: 'Gallon (US)',   short: 'gal',  factor: 3.78541 },
      { id: 'gal_uk', label: 'Gallon (UK)',   short: 'gal UK', factor: 4.54609 },
      { id: 'floz_us',label: 'Fluid Ounce (US)', short: 'fl oz', factor: 0.0295735 },
    ],
  },
  data: {
    name: 'Data',
    base: 'b',
    defaults: ['mb', 'gb'],
    units: [
      { id: 'b',  label: 'Byte',      short: 'B',  factor: 1 },
      { id: 'kb', label: 'Kilobyte',  short: 'KB', factor: 1024 },
      { id: 'mb', label: 'Megabyte',  short: 'MB', factor: 1048576 },
      { id: 'gb', label: 'Gigabyte',  short: 'GB', factor: 1073741824 },
      { id: 'tb', label: 'Terabyte',  short: 'TB', factor: 1099511627776 },
      { id: 'pb', label: 'Petabyte',  short: 'PB', factor: 1125899906842624 },
      { id: 'bit',label: 'Bit',       short: 'bit',factor: 0.125 },
      { id: 'kbit',label: 'Kilobit',  short: 'Kb', factor: 128 },
      { id: 'mbit',label: 'Megabit',  short: 'Mb', factor: 131072 },
      { id: 'gbit',label: 'Gigabit',  short: 'Gb', factor: 134217728 },
    ],
  },
  height: {
    name: 'Height',
    base: 'cm',
    defaults: ['cm', 'ftin'],
    units: [
      { id: 'cm',   label: 'Centimetre',  short: 'cm' },
      { id: 'm',    label: 'Metre',       short: 'm'  },
      { id: 'in',   label: 'Inch',        short: 'in' },
      { id: 'ft',   label: 'Foot',        short: 'ft' },
      { id: 'ftin', label: 'Feet & Inches', short: "ft'in\"" },
    ],
    toBase: (v, u) => {
      if (u === 'cm') return v;
      if (u === 'm') return v * 100;
      if (u === 'in') return v * 2.54;
      if (u === 'ft') return v * 30.48;
      if (u === 'ftin') {
        // v encoded as ft.in (e.g. 5.10 = 5ft 10in). We accept decimal like 5.8333 too.
        // Simpler: treat as decimal feet for input. Display formatting handled separately.
        return v * 30.48;
      }
    },
    fromBase: (v, u) => {
      if (u === 'cm') return v;
      if (u === 'm') return v / 100;
      if (u === 'in') return v / 2.54;
      if (u === 'ft') return v / 30.48;
      if (u === 'ftin') return v / 30.48; // as decimal feet; formatter will split
    },
  },
};

// Convert a value from one unit to another within a category
function convert(categoryId, value, fromId, toId) {
  const cat = CATEGORIES[categoryId];
  if (!cat || value === '' || value === null || isNaN(value)) return '';
  const v = Number(value);
  let base;
  if (cat.toBase) {
    base = cat.toBase(v, fromId);
  } else {
    const u = cat.units.find(x => x.id === fromId);
    base = v * u.factor;
  }
  let out;
  if (cat.fromBase) {
    out = cat.fromBase(base, toId);
  } else {
    const u = cat.units.find(x => x.id === toId);
    out = base / u.factor;
  }
  return out;
}

// Format a result nicely
function formatValue(v, unitId, categoryId) {
  if (v === '' || v === null || v === undefined || isNaN(v)) return '';
  // Special: weight stones & pounds (encoded as ST.LL where LL is integer pounds 00–13)
  if (categoryId === 'weight' && unitId === 'st_lb') {
    const sign = v < 0 ? '-' : '';
    const abs = Math.abs(v);
    const stones = Math.trunc(abs);
    const lbs = Math.round((abs - stones) * 100);
    return `${sign}${stones} st ${lbs} lb`;
  }
  // Special: height ft&in
  if (categoryId === 'height' && unitId === 'ftin') {
    const feet = Math.floor(v);
    const inches = Math.round((v - feet) * 12 * 10) / 10;
    if (inches >= 12) return `${feet + 1}' 0"`;
    return `${feet}' ${inches}"`;
  }
  // Special: cooking gas mark
  if (categoryId === 'cooking' && unitId === 'gas') {
    if (v <= 0.3) return '¼';
    if (v <= 0.6) return '½';
    return String(Math.round(v * 10) / 10);
  }
  const abs = Math.abs(v);
  if (abs === 0) return '0';
  if (abs >= 1000000) return v.toExponential(4);
  if (abs >= 100) return (Math.round(v * 100) / 100).toLocaleString();
  if (abs >= 1) return (Math.round(v * 10000) / 10000).toString();
  if (abs >= 0.01) return (Math.round(v * 100000) / 100000).toString();
  return v.toPrecision(4);
}

const HOME_ORDER = ['weight', 'distance', 'speed', 'currency', 'area', 'volume', 'temperature', 'time'];

Object.assign(window, { CATEGORIES, CATEGORY_COLORS, ICONS, HOME_ORDER, convert, formatValue });
