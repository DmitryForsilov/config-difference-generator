import path from 'path';
import fs from 'fs';
import makeDiff from '../src/index.js';

const getResultPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getFilePath = (fileName) => path.join('__fixtures__', fileName);

let resultDefault;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultDefault = fs.readFileSync(getResultPath('resultDefault.txt'), 'utf-8');
  resultPlain = fs.readFileSync(getResultPath('resultPlain.txt'), 'utf-8');
  resultJson = fs.readFileSync(getResultPath('resultJson.json'), 'utf-8');
});

test.each([
  [getFilePath('before.json'), getFilePath('after.json')],
  [getFilePath('before.yml'), getFilePath('after.yml')],
  [getFilePath('before.ini'), getFilePath('after.ini')],
])('makeDiff', (before, after) => {
  expect(makeDiff(before, after, 'default')).toBe(resultDefault);
  expect(makeDiff(before, after, 'plain')).toBe(resultPlain);
  expect((makeDiff(before, after, 'json'))).toBe((resultJson));
});
