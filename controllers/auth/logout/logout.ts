
export default function logout(req: any, res:any) {

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // no content

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: false
  });

  res.status(200).json({ massage : "logged out!" })

}