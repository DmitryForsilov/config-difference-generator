import path from 'path';
import fs from 'fs';
import makeDiff from '../src/index.js';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

let resultDefault;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultDefault = fs.readFileSync(getFixturePath('resultDefault.txt'), 'utf-8');
  resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
  resultJson = fs.readFileSync(getFixturePath('resultJson.json'), 'utf-8');
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiff', (before, after) => {
  expect(makeDiff(before, after, 'default')).toBe(resultDefault);
  expect(makeDiff(before, after, 'plain')).toBe(resultPlain);
  expect(JSON.parse(makeDiff(before, after, 'json'))).toStrictEqual(JSON.parse(resultJson));
});
