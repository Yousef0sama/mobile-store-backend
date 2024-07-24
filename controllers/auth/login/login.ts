// imports

import bcrypt from "bcrypt";
import axios from "axios";

// functions

import timeConvert from "../../../functions/time_convert/time_convert";
import checkInputs from "../../../functions/check_inputs/check_inputs";
import encodeJWT from "../../../functions/jwt/encode/encode";

// interfaces

import { Request, Response } from "express";
import { User } from "../../../interfaces/interfaces";

export default function login(req: Request, res:Response) : void {

  try {

    const { email, password } : { email: string, password : string} = req.body;

    // check inputs

    if (checkInputs(email, "string", "email")) {
      res.status(400).json({ message : checkInputs(email, "string", "email") });
      return;
    }

    if (checkInputs(password, "string", "password")) {
      res.status(400).json({ message : checkInputs(password, "string", "password") });
      return;
    }

    const host = `${req.protocol}://${req.get('host')}`

    axios.get(`${host}/usersForBackend/email/${email}`, {
      headers : {
        Authorization : `Bearer ${encodeJWT({}, process.env.BACKEND_KEY!, 5)}`
      }
    }).then( async (response) => {

      const result = response.data

      if (result.length < 1) {
        res.status(400).json({ message : "wrong email or password" });
        return;
      }

      const hashedPassword : string = result[0].password!;

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
        const token : string = encodeJWT({userID : user.id}, process.env.SECRET_KEY!, process.env.SECRET_KEY_EXPIRE_IN!);

        // genrate refresh token
        const refreshToken : string = encodeJWT({userID: user.id}, process.env.REFRESH_KEY!, process.env.REFRESH_KEY_EXPIRE_IN!);

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: timeConvert(4, "mo", "mi")
        });

        res.json({data: user, token: token});

      } else {
        res.status(400).json({ message : "wrong email or password" });
      }

    }).catch( (err) => {

      res.status(500).json({ message : err.message });

    })

  } catch (err) {
    res.status(400).json(err);
  }

}