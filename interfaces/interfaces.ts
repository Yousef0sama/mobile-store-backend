
// User interface

type userRole = "admin" | "user" | "moderator";

export interface User {
  id?: number,
  name: string,
  email: string,
  phone: string,
  role? : userRole,
  img? : string
  addresses? : Address[],
  card? : BankCards[]
};

// address interface

export interface Address {
  id?: number,
  userId?: number,
  country: string,
  state: string,
  city: string,
  street: string,
  otherStreet?: string | null,
  zip: number
};

// bank cards interface

export type cardType = "debit" | "credit" | "prepaid";

export interface BankCards {
    id? : number,
    userId? : number,
    addressId : number,
    cardNumber : string,
    expiredDate : string,
    cvv : string,
    cardType : cardType,
    bank : string
}

// for functions

// convert interfce

export type dateElement = "y" | "mo" | "w" | "d" | "h" | "m" | "s" | "mi";

export type Converts = {
  [key in dateElement]: number;
};