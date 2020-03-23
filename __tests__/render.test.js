import render from '../src/render.js';

const ast = {
  host: { status: 'unmodified', value: 'hexlet.io' },
  timeout: { status: 'modified', newValue: 20, oldValue: 50 },
  proxy: { status: 'deleted', value: '123.234.53.22' },
  follow: { status: 'deleted', value: false },
  verbose: { status: 'added', value: true },
};

const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('render', () => {
  expect(render(ast)).toBe(expected);
});
