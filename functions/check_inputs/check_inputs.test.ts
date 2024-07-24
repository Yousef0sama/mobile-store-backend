// Import the function to test

import checkInputs from './check_inputs';

describe.skip('checkInputs', () => {

  describe("empty test", () => {

    test('should return undefined for valid string input', () => {
      const result = checkInputs('Hello', 'string', 'Greeting');
      expect(result).toBeUndefined();
    });

    test('should return error message for empty string input', () => {
      const result = checkInputs('', 'string', 'Greeting');
      expect(result).toBe('Greeting can\'t be empty');
    });

  });

  describe("null and undfiend test", () => {

    test('should return error message for null input', () => {
      const result = checkInputs(null, 'string', 'Greeting');
      expect(result).toBe('Greeting can\'t be empty');
    });

    test('should return error message for undefined input', () => {
      const result = checkInputs(undefined, 'string', 'Greeting');
      expect(result).toBe('Greeting can\'t be empty');
    });

  });

  describe("type test", () => {

    test('should return error message for wrong type input', () => {
      const result = checkInputs(123, 'string', 'Age');
      expect(result).toBe('Age must be string');
    });

    test('should return undefined for valid number input', () => {
      const result = checkInputs(123, 'number', 'Age');
      expect(result).toBeUndefined();
    });

  });

  describe("arrays", () => {

    test('should return error message for empty array input', () => {
      const result = checkInputs([], 'object', 'List');
      expect(result).toBe('List can\'t be empty');
    });

    test('should return undefined for non-empty array input', () => {
      const result = checkInputs([1, 2, 3], 'object', 'List');
      expect(result).toBeUndefined();
    });

    test('should return error message for wrong type for array input', () => {
      const result = checkInputs([1, 2, 3], 'string', 'List');
      expect(result).toBe('List must be string');
    });

  });

});
