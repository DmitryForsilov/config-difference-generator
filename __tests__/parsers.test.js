import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import parsers from '../src/parsers.js';

test.each([
  ['before.json', JSON.parse],
  ['before.yml', yaml.safeLoad],
  ['before.ini', ini.parse],
])('parsers', (fileName, parser) => {
  const data = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', fileName), 'utf-8');

  expect(parsers(fileName)).toStrictEqual(parser(data));
});
