import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import makeAst from '../src/ast.js';

const expected = {
  host: { status: 'unmodified', value: 'hexlet.io' },
  timeout: { status: 'modified', newValue: 20, oldValue: 50 },
  proxy: { status: 'deleted', value: '123.234.53.22' },
  follow: { status: 'deleted', value: false },
  verbose: { status: 'added', value: true },
};

test.each([
  ['before.json', 'after.json', JSON.parse],
  ['before.yml', 'after.yml', yaml.safeLoad],
  ['before.ini', 'after.ini', ini.parse],
])('makeAst', (before, after, parser) => {
  const getData = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', fileName), 'utf-8');

    return parser(file);
  };

  expect(makeAst(getData(before), getData(after))).toStrictEqual(expected);
});
