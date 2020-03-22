import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parsers = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const format = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const parser = parsersList[format];

  return parser(data);
};

export default parsers;
