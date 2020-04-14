import path from 'path';
import fs from 'fs';
import makeDiff from '../src/index.js';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

let resultTree;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultTree = fs.readFileSync(getFixturePath('resultTree.txt'), 'utf-8');
  resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
  resultJson = fs.readFileSync(getFixturePath('resultJson.json'), 'utf-8');
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('makeDiff', (before, after) => {
  expect(makeDiff(before, after, 'tree')).toBe(resultTree);
  expect(makeDiff(before, after, 'plain')).toBe(resultPlain);
  expect((makeDiff(before, after, 'json'))).toBe((resultJson));
});
