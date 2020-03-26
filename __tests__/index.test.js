import makeDiff from '../src/index.js';
import resultDefault from '../__fixtures__/resultDefault.js';
import resultPlain from '../__fixtures__/resultPlain.js';

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiffRenderDefault', (before, after) => {
  expect(makeDiff(before, after, 'default')).toBe(resultDefault);
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiffRenderPlain', (before, after) => {
  expect(makeDiff(before, after, 'plain')).toBe(resultPlain);
});
