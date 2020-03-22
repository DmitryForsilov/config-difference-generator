import path from 'path';
import result from '../__fixtures__/result.js';
import makeDiff from '../src/index.js';

describe('makeDiff', () => {
  const workDir = __dirname;
  const expected = result;
  const makePath = (file) => path.join(workDir, '..', '__fixtures__', file);

  test('diffJson', () => {
    const before = makePath('before.json');
    const after = makePath('after.json');

    expect(makeDiff(before, after)).toBe(expected);
  });

  test('diffYaml', () => {
    const before = makePath('before.yml');
    const after = makePath('after.yml');

    expect(makeDiff(before, after)).toBe(expected);
  });
});
