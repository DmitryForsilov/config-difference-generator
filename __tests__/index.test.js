import makeDiff from '../src/index.js';
import result from '../__fixtures__/result.js';

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiff', (before, after) => {
  expect(makeDiff(before, after)).toBe(result);
});
