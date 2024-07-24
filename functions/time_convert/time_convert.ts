
// import interface

import { Converts, dateElement } from "../../interfaces/interfaces";

export default function timeConvert(val: number, from: dateElement, to: dateElement): number {

  let converts: Converts = {
    "y": 365.25 * 24 * 60 * 60 * 1000,
    "mo": 30.4375 * 24 * 60 * 60 * 1000,
    "w": 7 * 24 * 60 * 60 * 1000,
    "d": 24 * 60 * 60 * 1000,
    "h": 60 * 60 * 1000,
    "m": 60 * 1000,
    "s" : 1000,
    "mi": 1
  };

  let f = converts[from];
  let t = converts[to];

  let unit = f / t;
  let result = unit * val;

  return result;
}