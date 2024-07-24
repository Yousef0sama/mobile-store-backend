// imports

// db

import { createConnection } from "../../../config/db/Conn";

// interfaces

import { Request, Response } from "express";

// functions

import checkInputs from "../../../functions/check_inputs/check_inputs";

export default function deleteAddress (req : Request, res : Response) {

  try {

    const { id } = req.body

    if (checkInputs(id, "number", "id")) {
      res.status(400).json({ message : checkInputs(id, "number", "id") });
      return
    }

    let connection = createConnection();

    connection.connect();

    connection.query(`DELETE FROM addresses WHERE address_id = ${id}`, (err) => {

      connection.end();

      if (err) {
        res.status(500).json(err);
        return
      }

      res.status(200).json({ message : "data deleted" })

    });

  } catch (err) {

    res.status(400).json(err);

  }

}