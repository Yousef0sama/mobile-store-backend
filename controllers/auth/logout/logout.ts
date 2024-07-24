
// imports

import { Request, Response } from "express";

export default function logout(req: Request, res:Response) : void {

  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.sendStatus(204); // no content
      return;
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: false
    });

    res.status(200).json({ massage : "logged out!" });

  } catch (err) {
    res.status(400).json(err);
  }

}