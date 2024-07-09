
// imports

import jwt from "jsonwebtoken";

// db

import { createConnection } from "../../../config/db/Conn";

export default function (req: any, res: any) {

  const cookies = req.cookies

  // check if JWT cookie is declared

  if (!cookies?.jwt) res.status(401).json({ masssage : "unauthorized please login or sign up" }); 

  const refreshToken = cookies.jwt;

  // check if refresh token is true and check it's expires date

  jwt.verify(refreshToken, process.env.REFRESH_KEY!, (err : jwt.VerifyErrors | null, decoded : string | jwt.JwtPayload | undefined) => {

    if (err) return res.status(403).json({ massage : "forbidden not allowed to visit this site" });

    const connection = createConnection();

    connection.connect();

    // check if decoded is jwt payload and get user id from it

    if (typeof decoded !== "string" && decoded?.userID) {
      var userId = decoded.userID
    } else {
      return res.status(403).json({ masssage : "forbidden not allowed to visit this page" });
    }

    // get user data

    connection.query(`SELECT * FROM users WHERE u_id = ?`, [userId], (err, results) => {

      if (err) {
        return res.status(500).json(err);
      }

      // check if user in database

      if (results.length === 0) {
        return res.status(401).json({ masssage : "unauthorized please login or sign up" });
      }

      // return new access token

      const token : string = jwt.sign({userID : userId}, process.env.SECRET_KEY!, {
        expiresIn: process.env.SECRET_KEY_EXPIRE_IN!
      })

      res.status(200).json({ token })

    });

  })

}