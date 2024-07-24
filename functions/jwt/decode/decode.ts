// imports

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export default function decodeJWT(token : string) : string | JwtPayload {

  const data = jwt.decode(token)

  if (data) {
    return data;
  }

  return "";

}