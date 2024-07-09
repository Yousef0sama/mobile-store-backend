// imports

import jwt from "jsonwebtoken";

export default function verifyJWT (req: any, res: any, next : () => void) {

  // get access token

  const authHeader : string = req.headers.authorization || req.headers.Authorization;

  // check if it starts with "Bearer "

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ masssage : "unauthorized please login or sign up" })
  }

  // get the token from strig
  // string be like : "Bearer {token}" after spilt be like ["Bearer", "{token}"]

  const token = authHeader.split(" ")[1];

  // check if token is true and check expire date

  jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {

    // if token expired or it was wrong return forbidden

    if (err) return res.status(403).json({ masssage : "forbidden not allowed to visit this page" });

    // check if it has user id and it's type is jwt payload and if not return for bidden

    if (typeof decoded !== "string" && decoded?.userID) {
      req.user = decoded.userID;
      next();
    } else {
      return res.status(403).json({ masssage : "forbidden not allowed to visit this page" });
    }
  })

}