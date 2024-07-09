
// User interface

type id = number;
type name = string;
type email = string;
type phone = string;

export interface User {
  id: id;
  name: name;
  email: email;
  phone: phone;
};

// convert interfce

export type dateElement = "y" | "mo" | "w" | "d" | "h" | "m" | "s" | "mi";

export type Converts = {
  [key in dateElement]: number;
};