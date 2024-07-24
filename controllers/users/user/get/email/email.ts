// imports

// db

import { createConnection } from "../../../../../config/db/Conn";

// interfaces

import { Request, Response } from "express";
import { User } from "../../../../../interfaces/interfaces";

export default function getUserByEmail(req: Request, res: Response) {

  try {

    // get email

    const { email } = req.params;

    // check if email is exist

    if (!email) {
      res.sendStatus(204);
      return;
    }

    // connect to db

    const connection = createConnection();
    connection.connect( (err) => {

      res.status(500).json(err)

      console.log(err)
      return
    } );

    // get user from database

    connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
      connection.end();

      if (err) {
        res.status(500).json(err);
      }

      const user : User[] = result;

      res.json(user);

    })

  } catch (err) {

    res.status(400).json(err)

  }

}