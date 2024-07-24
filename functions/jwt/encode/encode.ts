// imports

import jwt from "jsonwebtoken";

export default function encodeJWT(data : {}, secretKey : string, expiredTime : string | number) : string {

  const token : string = jwt.sign(data, secretKey!, {
    expiresIn: expiredTime
  })

  return token
  

}