// imports

import bcrypt from "bcrypt";
import axios from "axios";

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import timeConvert from "../../../functions/time_convert/time_convert";
import checkInputs from "../../../functions/check_inputs/check_inputs";
import encodeJWT from "../../../functions/jwt/encode/encode";

// interfaces

import { Request, Response } from "express";
import { User } from "../../../interfaces/interfaces";

export default async function register  (req: Request, res: Response) : Promise<void> {

  try {
    const { name, email, password, phone } = req.body;

    // if inputs is empty and check it's type

    if (checkInputs(name, "string", "name")) {
      res.status(400).json({ message : checkInputs(name, "string", "name") });
      return;
    }

    if (checkInputs(email, "string", "email")) {
      res.status(400).json({ message : checkInputs(email, "string", "email") });
      return;
    }

    if (checkInputs(password, "string", "password")) {
      res.status(400).json({ message : checkInputs(password, "string", "password") });
      return;
    }

    if (checkInputs(phone, "string", "phone")) {
      res.status(400).json({ message : checkInputs(phone, "string", "phone") });
      return;
    }

    // hash the password

    const host = `${req.protocol}://${req.get('host')}`

    axios.get(`${host}/usersForBackend/email/${email}`, {
      headers : {
        Authorization : `Bearer ${encodeJWT({}, process.env.BACKEND_KEY!, 5)}`
      },
    }).then( async (response) => {

      const data : [] = response.data

      if (data.length > 0) {
        res.status(400).json({ message : "email is exist" });
        return;
      }

      // create the connection

      const hashedPassword : string = await bcrypt.hash(password, 10);

      let connection = createConnection();
      connection.connect();

      // Insert new user if email does not exist
      connection.query(`INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, phone], (err, result) : void => {
        connection.end();

        if (err) {
          res.status(500).json(err);
          return;
        }

        const user : User = {
          id : result.insertId,
          name,
          email,
          phone,
        }

        // genrate access token
        const token : string = encodeJWT({userID : user.id}, process.env.SECRET_KEY!, process.env.SECRET_KEY_EXPIRE_IN!);

        // genrate refresh token
        const refreshToken : string = encodeJWT({userID: user.id}, process.env.REFRESH_KEY!, process.env.REFRESH_KEY_EXPIRE_IN!);

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: timeConvert(4, "mo", "mi")
        });

        res.status(201).json({data : user, token});

      });

    }).catch( (err) => {
      res.status(500).json({ message : err.message});
    });

  } catch (err) {
    res.status(400).json(err);
  }

}