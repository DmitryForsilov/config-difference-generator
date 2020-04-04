import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';
import makeAst from './makeAst.js';
import renderDefault from './formatters/renderDefault.js';
import renderPlain from './formatters/renderPlain.js';
import renderJson from './formatters/renderJson.js';

const getData = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const extension = path.extname(fileName);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');

  return { fileData, extension };
};

const formatters = {
  default: renderDefault,
  plain: renderPlain,
  json: renderJson,
};

const makeDiff = (first, second, format) => {
  const firstData = getData(first);
  const secondData = getData(second);

  const ast = makeAst(parsers(firstData), parsers(secondData));
  const formatter = formatters[format];

  return formatter(ast);
};

export default makeDiff;
