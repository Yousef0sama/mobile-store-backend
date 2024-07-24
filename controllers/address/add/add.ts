// imports

import axios from "axios";

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import checkInputs, { checkType, isEmpty } from "../../../functions/check_inputs/check_inputs";

// interfaces

import { Request, Response } from "express";
import { Address } from "../../../interfaces/interfaces";

export default function addAddress (req: Request & {user?:any}, res: Response) : void {

  try {

    // get user id
    // it's added in req.user in verifyJWT middle ware

    let userId = req.user;

    if (!userId) {
      res.status(401).json( {massage : "unauthorized please login or sign up"} );
      return;
    }

    const {country, state, city, street, otherStreet = null, zip} : Address = req.body;

    // check inputs

    if (checkInputs(country, "string", "country")) {
      res.status(400).json({ message : checkInputs(country, "string", "country") });
      return;
    }

    if (checkInputs(state, "string", "state")) {
      res.status(400).json({ message : checkInputs(state, "string", "state") });
      return;
    }

    if (checkInputs(city, "string", "city")) {
      res.status(400).json({ message : checkInputs(city, "string", "city") });
      return;
    }

    if (checkInputs(street, "string", "street")) {
      res.status(400).json({ message : checkInputs(street, "string", "street") });
      return;
    }

    if (!isEmpty(otherStreet)) {

      if (!checkType(otherStreet, "string")) {
        res.status(400).json({ message : "other street must be string" })
        return;
      }

    }

    if (checkInputs(zip, "number", "zip")) {
      res.status(400).json({ message : checkInputs(zip, "number", "zip") });
      return;
    }

    // connect to database

    let connection = createConnection();
    connection.connect();

    connection.query(`INSERT INTO addresses (user_id, country, state, city, street, otherStreet, zip) VALUES (?, ?, ?, ?, ?, ?, ?)`,[userId, country, state, city, street, otherStreet, zip], (err) : void => {

      connection.end();

      if (err) {
        res.status(500).json(err);
        return
      }

      res.status(201).json({ message : "data inserted!" });

    });

  } catch (err) {
    res.status(400).json(err)
  }

}