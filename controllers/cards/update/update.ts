
// imports

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import checkInputs, {isEmpty, checkType} from "../../../functions/check_inputs/check_inputs";
import encrypt from "../../../functions/encrypt/encrypt";

// interfaces

import { Request, Response } from "express";
import { BankCards, cardType } from "../../../interfaces/interfaces";

export default function updateCard(req: Request & {user? : any}, res: Response) {

  try {

    // vars

    const {id, address_id, cardNumber, expiredDate, cvv, cardType, bank} = req.body;

    const visaExpiredDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    const cvvRegex = /^\d{3,4}$/;

    const cardNumberRegex = /^\d{16}$/;

    const validCardTypes : cardType[] = ["credit", "debit", "prepaid"]

    // check inputs

    if (checkInputs(id, "number", "id")) {
      res.status(400).json({ message : checkInputs(id, "number", "id") });
      return;
    }

    if (!isEmpty(address_id)) {

      if (!checkType(address_id, "number")) {
        res.status(400).json({ message : "address_id must be number" })
        return;
      }

    }

    if (!isEmpty(cardNumber)) {

      if (!checkType(cardNumber, "string")) {
        res.status(400).json({ message : "card number must be string" })
        return;
      }

      if (cardNumberRegex.test(cardNumber)) {
        res.status(400).json( {message : "card number not valid" } );
        return;
      }

    }

    if (!isEmpty(expiredDate)) {

      if (!checkType(expiredDate, "string")) {
        res.status(400).json({ message : "expire date must be string" })
        return;
      }

      if (visaExpiredDateRegex.test(expiredDate)) {
        res.status(400).json( {message : "expired date not valid it must be like \"mm\\yy\"" } );
        return;
      }

    }

    if (!isEmpty(cvv)) {

      if (!checkType(cvv, "string")) {
        res.status(400).json({ message : "cvv must be string" })
        return;
      }

      if (cvvRegex.test(cvv)) {
        res.status(400).json( {message : "cvv not valid it must have only digits and it's length be 3 or 4" } );
        return;
      }

    }

    if (!isEmpty(cardType)) {

      if (!checkType(cardType, "string")) {
        res.status(400).json({ message : "card type must be string" })
        return;
      }

      if (!validCardTypes.includes(cardType)) {
        res.status(400).json( {message : "card type must be one of [credit, debit, prepaid]"} );
        return;
      }

    }

    if (!isEmpty(bank)) {

      if (!checkType(bank, "string")) {
        res.status(400).json({ message : "bank must be number" })
        return;
      }

    }

    let sqlInputs : string = ``

    // if address_id add address_id

    sqlInputs += `${address_id ? `address_id =  '${address_id}'` : ""}`;

    // if cardNumber add cardNumber

    sqlInputs += `${cardNumber ? `${sqlInputs.length > 0 ? "," : ""} card_number =  '${cardNumber}'` : ""}`;

    // if city add city

    sqlInputs += `${expiredDate ? `${sqlInputs.length > 0 ? "," : ""} expire_date =  '${expiredDate}'` : ""}`;

    // if street add street

    sqlInputs += `${cvv ? `${sqlInputs.length > 0 ? "," : ""} cvv =  '${cvv}'` : ""}`;

    // if otherStreet add otherStreet

    sqlInputs += `${cardType ? `${sqlInputs.length > 0 ? "," : ""} card_type =  '${cardType}'` : ""}`;

    // if zip add zip

    sqlInputs += `${bank ? `${sqlInputs.length > 0 ? "," : ""} bank =  '${bank}'` : ""}`

    if (sqlInputs.length === 0) {

      res.status(204).json({ message : "no data to update" });
      return;

    }

    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE cards SET ${sqlInputs} WHERE card_id = ${id}`, (err) => {

      connection.end();

      if (err) {
        res.status(500).json(err);
      }

      res.status(200).json({ message : "data updated!" });

    })

  } catch (err) {

    res.status(400).json(err)

  }

}