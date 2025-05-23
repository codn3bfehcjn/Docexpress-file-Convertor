import { rgb } from 'pdf-lib';

export function hextorgb(hexcolor) {
  const value = parseInt(hexcolor.replace('#', ''), 16);
  const r = ((value >> 16) & 255) / 255;
  const g = ((value >> 8) & 255) / 255;
  const b = (value & 255) / 255;
  return rgb(r, g, b);
}