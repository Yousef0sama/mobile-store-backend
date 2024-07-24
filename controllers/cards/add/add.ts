
// imports

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import checkInputs from "../../../functions/check_inputs/check_inputs";
import encrypt from "../../../functions/encrypt/encrypt";

// interfaces

import { Request, Response } from "express";
import { BankCards, cardType } from "../../../interfaces/interfaces";

export default function addCard(req:Request & {user? : any}, res:Response) {

  try {

     // get user
    // user added in req in verify jwt middle ware

    const userId = req.user;

    if (!userId) {
      res.status(401).json( {massage : "unauthorized please login or sign up"} );
      return;
    }

    // vars

    const {addressId, cardNumber, expiredDate, cvv, cardType, bank} = req.body;

    const visaExpiredDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    const cvvRegex = /^\d{3,4}$/;

    const cardNumberRegex = /^\d{16}$/;

    const validCardTypes : cardType[] = ["credit", "debit", "prepaid"]

    // check inputs

    if (checkInputs(addressId, "number", "address id")) {
      res.status(400).json( {message : checkInputs(addressId, "number", "address id")} );
      return;
    }

    if (checkInputs(cardNumber, "string", "card number")) {
      res.status(400).json( {message : checkInputs(cardNumber, "string", "card number")} );
      return;
    }

    if (!cardNumberRegex.test(cardNumber)) {
      res.status(400).json( {message : "card number not valid" } );
      return;
    }

    if (checkInputs(expiredDate, "string", "expired date")) {
      res.status(400).json( {message : checkInputs(expiredDate, "string", "expired date")} );
      return;
    }

    if (!visaExpiredDateRegex.test(expiredDate)) {
      res.status(400).json( {message : "expired date not valid it must be like 'mm / yy'" } );
      return;
    }

    if (checkInputs(cvv, "string", "cvv")) {
      res.status(400).json( {message : checkInputs(cvv, "string", "cvv")} );
      return;
    }

    if (!cvvRegex.test(cvv)) {
      res.status(400).json( {message : "cvv not valid it must have only digits and it's length be 3 or 4" } );
      return;
    }

    if (checkInputs(cardType, "string", "card type")) {
      res.status(400).json( {message : checkInputs(cardType, "string", "card type")} );
      return;
    }

    if (!validCardTypes.includes(cardType)) {
      res.status(400).json( {message : "card type must be one of [credit, debit, prepaid]"} );
      return;
    }

    if (checkInputs(bank, "string", "bank")) {
      res.status(400).json( {message : checkInputs(bank, "string", "bank")} );
      return;
    }

    // vars

    const encryptedCardNumber = encrypt(cardNumber);

    const encryptedCvv = encrypt(cvv);

    const card : BankCards = {
      userId : userId,
      addressId: addressId,
      cardNumber: encryptedCardNumber,
      expiredDate: expiredDate,
      cvv: encryptedCvv,
      cardType: cardType,
      bank: bank
    }

    // connect to db

    const connection = createConnection()
    connection.connect();

    connection.query(`INSERT INTO cards (user_id, address_id, card_number, expire_date, cvv, card_type, bank) VALUES (?, ?, ?, ?, ?, ?, ?)`, [card.userId, card.addressId, card.cardNumber, card.expiredDate, card.cvv, card.cardType, card.bank], (err) => {

      connection.end();

      if (err) {
        res.status(500).json(err);
        return;
      }

      res.status(200).json({ message : "data inserted!" });

    })

  } catch (err) {

    res.status(400).json(err);

  }

}