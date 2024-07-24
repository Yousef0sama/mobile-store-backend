"use strict";
// Import the function to test
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_inputs_1 = __importDefault(require("./check_inputs"));
describe.skip('checkInputs', () => {
    describe("empty test", () => {
        test('should return undefined for valid string input', () => {
            const result = (0, check_inputs_1.default)('Hello', 'string', 'Greeting');
            expect(result).toBeUndefined();
        });
        test('should return error message for empty string input', () => {
            const result = (0, check_inputs_1.default)('', 'string', 'Greeting');
            expect(result).toBe('Greeting can\'t be empty');
        });
    });
    describe("null and undfiend test", () => {
        test('should return error message for null input', () => {
            const result = (0, check_inputs_1.default)(null, 'string', 'Greeting');
            expect(result).toBe('Greeting can\'t be empty');
        });
        test('should return error message for undefined input', () => {
            const result = (0, check_inputs_1.default)(undefined, 'string', 'Greeting');
            expect(result).toBe('Greeting can\'t be empty');
        });
    });
    describe("type test", () => {
        test('should return error message for wrong type input', () => {
            const result = (0, check_inputs_1.default)(123, 'string', 'Age');
            expect(result).toBe('Age must be string');
        });
        test('should return undefined for valid number input', () => {
            const result = (0, check_inputs_1.default)(123, 'number', 'Age');
            expect(result).toBeUndefined();
        });
    });
    describe("arrays", () => {
        test('should return error message for empty array input', () => {
            const result = (0, check_inputs_1.default)([], 'object', 'List');
            expect(result).toBe('List can\'t be empty');
        });
        test('should return undefined for non-empty array input', () => {
            const result = (0, check_inputs_1.default)([1, 2, 3], 'object', 'List');
            expect(result).toBeUndefined();
        });
        test('should return error message for wrong type for array input', () => {
            const result = (0, check_inputs_1.default)([1, 2, 3], 'string', 'List');
            expect(result).toBe('List must be string');
        });
    });
});
