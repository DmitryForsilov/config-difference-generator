import render from '../src/render.js';
import ast from '../__fixtures__/ast.js';
import result from '../__fixtures__/result.js';

test('render', () => {
  expect(render(ast)).toBe(result);
});
