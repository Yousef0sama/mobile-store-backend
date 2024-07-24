// imports

// imports

// db

import { createConnection } from "../../../../../config/db/Conn";

// interfaces

import { Request, Response } from "express";
import { User } from "../../../../../interfaces/interfaces";

export default function getUserById(req: Request, res: Response) {

  try {

    // get id

    const { id } = req.params;

    // check if id is exist

    if (!id) {
      res.sendStatus(204);
      return;
    }

    // connect to db

    const connection = createConnection();
    connection.connect();

    // get user from database

    connection.query(`SELECT u_id, name, email, role, phone, img FROM users WHERE u_id = '${id}'`, (err, result) => {
      connection.end();

      if (err) {
        res.status(500).json(err);
      }

      const user : User[] = result;

      res.json(user);

    })

  } catch (err) {

    res.status(400).json(err);

  }

}