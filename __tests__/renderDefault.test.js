import path from 'path';
import fs from 'fs';
import renderDefault from '../src/formatters/renderDefault.js';
import ast from '../__fixtures__/ast.js';

const resultDefault = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'resultDefault.txt'), 'utf-8');

test('renderDefault', () => {
  expect(renderDefault(ast)).toBe(resultDefault);
});
