import path from 'path';
import fs from 'fs';
import renderJson from '../src/formatters/renderJson.js';
import ast from '../__fixtures__/ast.js';

const resultJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'resultJson.json'), 'utf-8'));

test('renderJson', () => {
  expect(JSON.parse(renderJson(ast))).toStrictEqual(resultJson);
});
