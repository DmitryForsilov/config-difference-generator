import renderDefault from '../src/formatters/renderDefault.js';
import ast from '../__fixtures__/ast.js';
import resultDefault from '../__fixtures__/resultDefault.js';

test('renderDefault', () => {
  expect(renderDefault(ast)).toBe(resultDefault);
});
