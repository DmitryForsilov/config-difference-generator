import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import makeAst from '../src/makeAst.js';
import ast from '../__fixtures__/ast.js';

test.each([
  ['before.json', 'after.json', JSON.parse],
  ['before.yml', 'after.yml', yaml.safeLoad],
  ['before.ini', 'after.ini', ini.parse],
])('makeAst', (before, after, parser) => {
  const getData = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', fileName), 'utf-8');

    return parser(file);
  };

  expect(makeAst(getData(before), getData(after))).toStrictEqual(ast);
});
