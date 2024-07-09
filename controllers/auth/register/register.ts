// imports

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import { checkType, isEmpty, timeConvert } from "../../../functions/functions";

// interfaces

import { User } from "../../../interfaces/interfaces";

export default async function register  (req: any, res: any) : Promise<void> {

  try {
    const { name, email, password, phone } = req.body;

    // if inputs is empty and check it's type

    if (!checkType(name, "string") || isEmpty(name)) {
      res.status(400).json({ masssage : "name can't be empty and must be string" });
      return;
    }

    if (!checkType(email, "string") || isEmpty(email)) {
      res.status(400).json({ masssage : "email can't be empty and must be string" });
      return;
    }

    if (!checkType(password, "string") || isEmpty(password)) {
      res.status(400).json({ masssage : "password can't be empty and must be string" });
      return;
    }

    if (!checkType(phone, "string") || isEmpty(phone)) {
      res.status(400).json({ masssage : "phone can't be empty and must be string" });
      return;
    }

    // hash the password

    const hashedPassword : string = await bcrypt.hash(password, 10);

    // create the connection

    let connection = createConnection();
    connection.connect();

    // Check if email already exists
    connection.query(`SELECT email FROM users WHERE email = ?`, [email], (err, result) => {
      if (err) {
        res.status(500).json(err);
        connection.end();
        return;
      }

      if (result.length > 0) {
        res.status(400).json({ masssage : "email is already exist" });
        connection.end();
        return;
      }

      // Insert new user if email does not exist
      connection.query(`INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, phone], (err, result) => {
        connection.end();

        const user : User = {
          id : result.insertId,
          name,
          email,
          phone,
        }

        // genrate access token
        const token : string = jwt.sign({userID : user.id}, process.env.SECRET_KEY!, {
          expiresIn: process.env.SECRET_KEY_EXPIRE_IN!
        })

        // genrate refresh token
        const refreshToken : string = jwt.sign({userID: user.id}, process.env.REFRESH_KEY!, {
            expiresIn: process.env.REFRESH_KEY_EXPIRE_IN!
        });

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "None",
          maxAge: timeConvert(4, "mo", "mi")
        });

        if (err) {
          res.status(500).json(err);
        } else {
          res.status(201).json({data : user, token});
        }
      });
    });

  } catch (err) {
    res.status(400).json(err);
  }

}