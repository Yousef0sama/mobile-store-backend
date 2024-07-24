"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const time_convert_1 = __importDefault(require("./time_convert"));
// functions
function convertTest(val, from, to, result) {
    return () => {
        expect((0, time_convert_1.default)(val, from, to)).toBeCloseTo(result);
    };
}
// from and to year
describe.skip("from and to year", () => {
    describe("convert year to month", () => {
        let unit = 12;
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "mo", i * unit));
        }
    });
    describe("convert month to year", () => {
        let unit = 12;
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "y", i / unit));
        }
    });
    describe("convert year to week", () => {
        let unit = 52.17857142857; // year have 52 weeks and 1 day
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "w", i * unit));
        }
    });
    describe("convert week to year", () => {
        let unit = 52.17857142857; // year have 52 weeks and 1 day
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "y", i / unit));
        }
    });
    describe("convert year to day", () => {
        let unit = 365.25; // year have 365.25 days
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "d", i * unit));
        }
    });
    describe("convert day to year", () => {
        let unit = 365.25; // year have 365.25 days
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "y", i / unit));
        }
    });
    describe("convert year to hour", () => {
        let unit = 365.25 * 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "h", i * unit));
        }
    });
    describe("convert hour to year", () => {
        let unit = 365.25 * 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "y", i / unit));
        }
    });
    describe("convert year to minute", () => {
        let unit = 365.25 * 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "m", i * unit));
        }
    });
    describe("convert minute to year", () => {
        let unit = 365.25 * 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "y", i / unit));
        }
    });
    describe("convert year to second", () => {
        let unit = 365.25 * 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "s", i * unit));
        }
    });
    describe("convert second to year", () => {
        let unit = 365.25 * 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "y", i / unit));
        }
    });
    describe("convert year to milli second", () => {
        let unit = 365.25 * 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} years`, convertTest(i, "y", "mi", i * unit));
        }
    });
    describe("convert milli second to year", () => {
        let unit = 365.25 * 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milli seconds`, convertTest(i, "mi", "y", i / unit));
        }
    });
});
// from and to month
describe.skip("from and to month", () => {
    describe("convert month to week", () => {
        let unit = 4.34821428571; // month as 30.4375 has 4 weaks and few days
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "w", i * unit));
        }
    });
    describe("convert week to month", () => {
        let unit = 4.34821428571; // month as 30.4375 has 4 weaks and few days
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "mo", i / unit));
        }
    });
    describe("convert month to day", () => {
        let unit = 30.4375; // average days in a month
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "d", i * unit));
        }
    });
    describe("convert day to month", () => {
        let unit = 30.4375; // average days in a month
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "mo", i / unit));
        }
    });
    describe("convert month to hour", () => {
        let unit = 30.4375 * 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "h", i * unit));
        }
    });
    describe("convert hour to month", () => {
        let unit = 30.4375 * 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "mo", i / unit));
        }
    });
    describe("convert month to minute", () => {
        let unit = 30.4375 * 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "m", i * unit));
        }
    });
    describe("convert minute to month", () => {
        let unit = 30.4375 * 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "mo", i / unit));
        }
    });
    describe("convert month to second", () => {
        let unit = 30.4375 * 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "s", i * unit));
        }
    });
    describe("convert second to month", () => {
        let unit = 30.4375 * 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "mo", i / unit));
        }
    });
    describe("convert month to milli second", () => {
        let unit = 30.4375 * 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} months`, convertTest(i, "mo", "mi", i * unit));
        }
    });
    describe("convert milli second to month", () => {
        let unit = 30.4375 * 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milliseconds`, convertTest(i, "mi", "mo", i / unit));
        }
    });
});
// from and to week
describe.skip("from and to week", () => {
    describe("convert week to day", () => {
        let unit = 7;
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "d", i * unit));
        }
    });
    describe("convert day to week", () => {
        let unit = 7;
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "w", i / unit));
        }
    });
    describe("convert week to hour", () => {
        let unit = 7 * 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "h", i * unit));
        }
    });
    describe("convert hour to week", () => {
        let unit = 7 * 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "w", i / unit));
        }
    });
    describe("convert week to minute", () => {
        let unit = 7 * 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "m", i * unit));
        }
    });
    describe("convert minute to week", () => {
        let unit = 7 * 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "w", i / unit));
        }
    });
    describe("convert week to second", () => {
        let unit = 7 * 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "s", i * unit));
        }
    });
    describe("convert second to week", () => {
        let unit = 7 * 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "w", i / unit));
        }
    });
    describe("convert week to millisecond", () => {
        let unit = 7 * 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} weeks`, convertTest(i, "w", "mi", i * unit));
        }
    });
    describe("convert millisecond to week", () => {
        let unit = 7 * 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milliseconds`, convertTest(i, "mi", "w", i / unit));
        }
    });
});
// from and to day
describe.skip("from and to day", () => {
    describe("convert day to hour", () => {
        let unit = 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "h", i * unit));
        }
    });
    describe("convert hour to day", () => {
        let unit = 24;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "d", i / unit));
        }
    });
    describe("convert day to minute", () => {
        let unit = 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "m", i * unit));
        }
    });
    describe("convert minute to day", () => {
        let unit = 24 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "d", i / unit));
        }
    });
    describe("convert day to second", () => {
        let unit = 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "s", i * unit));
        }
    });
    describe("convert second to day", () => {
        let unit = 24 * 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "d", i / unit));
        }
    });
    describe("convert day to milli second", () => {
        let unit = 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} days`, convertTest(i, "d", "mi", i * unit));
        }
    });
    describe("convert milli second to day", () => {
        let unit = 24 * 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milliseconds`, convertTest(i, "mi", "d", i / unit));
        }
    });
});
// from and to hour
describe.skip("from and to hour", () => {
    describe("convert hour to minute", () => {
        let unit = 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "m", i * unit));
        }
    });
    describe("convert minute to hour", () => {
        let unit = 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "h", i / unit));
        }
    });
    describe("convert hour to second", () => {
        let unit = 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "s", i * unit));
        }
    });
    describe("convert second to hour", () => {
        let unit = 60 * 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "h", i / unit));
        }
    });
    describe("convert hour to milli second", () => {
        let unit = 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} hours`, convertTest(i, "h", "mi", i * unit));
        }
    });
    describe("convert milli second to hour", () => {
        let unit = 60 * 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milliseconds`, convertTest(i, "mi", "h", i / unit));
        }
    });
});
// from and to minute
describe.skip("from and to minute", () => {
    describe("convert minute to second", () => {
        let unit = 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "s", i * unit));
        }
    });
    describe("convert second to minute", () => {
        let unit = 60;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "m", i / unit));
        }
    });
    describe("convert minute to milli second", () => {
        let unit = 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} minutes`, convertTest(i, "m", "mi", i * unit));
        }
    });
    describe("convert milli second to minute", () => {
        let unit = 60 * 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milliseconds`, convertTest(i, "mi", "m", i / unit));
        }
    });
});
// from and to second
describe.skip("from and to second", () => {
    describe("convert second to milli second", () => {
        let unit = 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} seconds`, convertTest(i, "s", "mi", i * unit));
        }
    });
    describe("convert milli second to second", () => {
        let unit = 1000;
        for (let i = 1; i <= 100; i++) {
            test(`${i} milliseconds`, convertTest(i, "mi", "s", i / unit));
        }
    });
});
