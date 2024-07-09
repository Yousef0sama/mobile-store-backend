// check type

export function checkType (field : any, type : string) {
  return typeof field === type;
}

// is empty

export function isEmpty (field : any)  {
  if (field) return false
  return true
}

// import interface

import { Converts, dateElement } from "../interfaces/interfaces";

export function timeConvert(val: number, from: dateElement, to: dateElement): number {

  let converts: Converts = {
    "y": 365 * 24 * 60 * 60 * 1000,
    "mo": 30 * 24 * 60 * 60 * 1000,
    "w": 7 * 24 * 60 * 60 * 1000,
    "d": 24 * 60 * 60 * 1000,
    "h": 60 * 60 * 1000,
    "m": 60 * 1000,
    "s" : 1000,
    "mi": 1
  };

  let fromMilliseconds = val * converts[from];
  let result = fromMilliseconds / converts[to];

  return result;
}