import path from 'path';
import result from '../__fixtures__/result.js';
import makeDiff from '../src/index.js';

describe('makeDiff', () => {
  const expected = result;
  const makePath = (file) => path.join(__dirname, '..', '__fixtures__', file);
  const before = (format) => makePath(`before.${format}`);
  const after = (format) => makePath(`after.${format}`);

  test('diffJson', () => {
    expect(makeDiff(before('json'), after('json'))).toBe(expected);
  });

  test('diffYaml', () => {
    expect(makeDiff(before('yml'), after('yml'))).toBe(expected);
  });
});
