// imports

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import { checkType, isEmpty, timeConvert } from "../../../functions/functions";
import { User } from "../../../interfaces/interfaces";

export default function login(req: any, res:any) {

  try {

    const { email, password } = req.body;

    // check inputs

    if (!checkType(email, "string") || isEmpty(email)) {
      res.status(400).json({ masssage : "email can't be empty and must be string" });
      return;
    }

    if (!checkType(password, "string") || isEmpty(password)) {
      res.status(400).json({ masssage : "password can't be empty and must be string" });
      return;
    }


    // connect to db

    let connection = createConnection();
    connection.connect();

    // get user

    connection.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, result) => {
      if (err) {
        res.status(500).json(err);
        connection.end();
        return;
      }

      // check if user found

      if (result.length < 1) {
        res.status(400).json({ masssage : "wrong email or password" });
        connection.end();
        return;
      }

      const hashedPassword : string = result[0].password;

      const passwordMatch : boolean = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {

        // user data
        const user : User = {
          id : result[0].u_id,
          name : result[0].name,
          email : result[0].email,
          phone : result[0].phone
        };

        // generate token
        const token = jwt.sign({userID : user.id}, process.env.SECRET_KEY!, {
          expiresIn: process.env.SECRET_KEY_EXPIRE_IN!
        })

        // genrate refresh token
        const refreshToken : string = jwt.sign({userID: user.id}, process.env.REFRESH_KEY!, {
          expiresIn: process.env.REFRESH_KEY_EXPIRE_IN!
        });

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: timeConvert(4, "mo", "mi")
        });

        res.json({data: user, token: token});

      } else {
        res.status(400).json({ masssage : "wrong email or password" });
      }

      connection.end();

    });
  } catch (err) {
    res.status(400).json(err);
  }

}