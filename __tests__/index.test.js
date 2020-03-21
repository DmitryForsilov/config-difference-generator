import path from 'path';
import result from '../__fixtures__/result.js';
import makeDiff from '../src/index.js';

test('makeDiff', () => {
  const workDir = __dirname;
  const beforePath = path.join(workDir, '..', '__fixtures__', 'before.json');
  const afterPath = path.join(workDir, '..', '__fixtures__', 'after.json');
  const expected = result;

  expect(makeDiff(beforePath, afterPath)).toBe(expected);
});
