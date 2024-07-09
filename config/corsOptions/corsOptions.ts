import { allowedOrigins } from "../allowedOrgins/allowedOrigins";

export const corsOptions = {
  orgin : (origin : string, cb: (arg0: null | Error, arg1?: boolean) => void) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  optionSuccessStatus: 200
}