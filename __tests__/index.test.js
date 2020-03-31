import makeDiff from '../src/index.js';
import resultJson from '../__fixtures__/resultJson.json';

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiff', (before, after) => {
  // expect(makeDiff(before, after, 'default')).toBe(resultDefault);
  // expect(makeDiff(before, after, 'plain')).toBe(resultPlain);
  expect(JSON.parse(makeDiff(before, after, 'json'))).toStrictEqual(resultJson);
});
