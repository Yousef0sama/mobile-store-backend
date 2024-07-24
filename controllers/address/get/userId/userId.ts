// imports

// db

import { createConnection } from "../../../../config/db/Conn";

// interfaces

import { Request, Response } from "express";
import { Address } from "../../../../interfaces/interfaces";

export default function getAddressByUserId(req: Request, res: Response) {

  try {

    // get user id

    const { userId } = req.params;

    // check if user id is exist

    if (!userId) {
      res.sendStatus(204);
      return;
    }

    // connect to db

    const connection = createConnection();
    connection.connect();

    // get address from database

    connection.query(`SELECT address_id, user_id, country, state, city, street, otherStreet, zip FROM addresses WHERE user_id = ${userId}`, (err, result) => {
      connection.end();

      if (err) {
        res.status(500).json(err);
      }

      const address : Address[] = result;

      res.json(address);

    })

  } catch (err) {

    res.status(400).json(err);

  }

}