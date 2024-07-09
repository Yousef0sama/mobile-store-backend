"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins_1 = require("../allowedOrgins/allowedOrigins");
exports.corsOptions = {
    orgin: (origin, cb) => {
        if (allowedOrigins_1.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
        }
        else {
            cb(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
};
