import path from 'path';
import fs from 'fs';
import makeDiff from '../src/index.js';

const resultDefault = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'resultDefault.txt'), 'utf-8');
const resultPlain = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'resultPlain.txt'), 'utf-8');
const resultJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'resultJson.json'), 'utf-8'));

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiff', (before, after) => {
  expect(makeDiff(before, after, 'default')).toBe(resultDefault);
  expect(makeDiff(before, after, 'plain')).toBe(resultPlain);
  expect(JSON.parse(makeDiff(before, after, 'json'))).toStrictEqual(resultJson);
});
