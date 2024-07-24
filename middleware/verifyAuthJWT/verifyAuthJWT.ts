// imports

import jwt from "jsonwebtoken";

// interfaces

import { Request, Response, NextFunction } from "express";

export default function verifyAuthJWT (req: Request & {user?: any}, res: Response, next : NextFunction) : void {

  try {

    // get access token

    const authHeader : string | undefined | string[] = req.headers.authorization || req.headers.Authorization;

    // check if it starts with "Bearer "

    if (typeof authHeader === "string" && !authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message : "unauthorized please login or sign up" });
      return;
    }

    // get the token from strig
    // string be like : "Bearer {token}" after spilt be like ["Bearer", "{token}"]

    let token : string = "";
    if (typeof authHeader === "string") {
      token = authHeader?.split(" ")[1]
    }

    // check if token is true and check expire date

    jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) : void => {

      // if token expired or it was wrong return forbidden

      if (err) {
        res.status(403).json({ masssage : "forbidden not allowed to visit this page" });
        return;
      }

      // check if it has user id and it's type is jwt payload and if not return for bidden

      if (typeof decoded !== "string" && decoded?.userID) {
        req.user = decoded.userID;
        next();
      } else {
        res.status(403).json({ message : "forbidden not allowed to visit this page" });
        return;
      }
    })

  } catch (err) {

    res.status(400).json(err)

  }

}