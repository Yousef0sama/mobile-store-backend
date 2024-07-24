
// imports

import jwt from "jsonwebtoken";

// interfaces

import { Request, Response } from "express";

// db

import { createConnection } from "../../../config/db/Conn";

export default function (req: Request, res: Response) : void {

  try {

    const cookies = req.cookies

    // check if JWT cookie is declared

    if (!cookies?.jwt) {
      res.status(401).json({ message : "unauthorized please login or sign up" });
      return
    }

    const refreshToken = cookies.jwt;

    // check if refresh token is true and check it's expires date

    jwt.verify(refreshToken, process.env.REFRESH_KEY!, (err : jwt.VerifyErrors | null, decoded : string | jwt.JwtPayload | undefined) : void => {

      if (err) {
        res.status(403).json({ message : "forbidden not allowed to visit this site" });
        return;
      };

      const connection = createConnection();

      connection.connect();

      // check if decoded is jwt payload and get user id from it

      if (typeof decoded !== "string" && decoded?.userID) {
        var userId = decoded.userID
      } else {
        res.status(403).json({ message : "forbidden not allowed to visit this page" });
        return;
      }

      // get user data

      connection.query(`SELECT * FROM users WHERE u_id = ?`, [userId], (err, results) : void => {

        if (err) {
          res.status(500).json(err);
          return;
        }

        // check if user in database

        if (results.length === 0) {
          res.status(401).json({ message : "unauthorized please login or sign up" });
          return;
        }

        // return new access token

        const token : string = jwt.sign({userID : userId}, process.env.SECRET_KEY!, {
          expiresIn: process.env.SECRET_KEY_EXPIRE_IN!
        })

        res.status(200).json({ token })

      });

    })

  } catch (err) {
    res.status(400).json(err);
  }

}