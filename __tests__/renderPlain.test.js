import renderPlain from '../src/formatters/renderPlain.js';
import ast from '../__fixtures__/ast.js';
import resultPlain from '../__fixtures__/resultPlain.js';

test('renderPlain', () => {
  expect(renderPlain(ast)).toBe(resultPlain);
});
