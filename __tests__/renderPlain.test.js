import path from 'path';
import fs from 'fs';
import renderPlain from '../src/formatters/renderPlain.js';
import ast from '../__fixtures__/ast.js';

const resultPlain = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'resultPlain.txt'), 'utf-8');

test('renderPlain', () => {
  expect(renderPlain(ast)).toBe(resultPlain);
});
