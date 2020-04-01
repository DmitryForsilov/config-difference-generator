import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const getData = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const format = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  return { data, format };
};

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parsers = (fileName) => {
  const { data, format } = getData(fileName);
  const parser = parsersList[format];

  return parser(data);
};

export default parsers;
