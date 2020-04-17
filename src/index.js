import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import makeAst from './makeAst.js';
import getFormatter from './formatters/index.js';

const getFileData = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const extension = path.extname(fileName);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  return { data, extension };
};

const makeDiff = (firstConfig, secondConfig, format) => {
  const firstData = getFileData(firstConfig);
  const secondData = getFileData(secondConfig);

  const ast = makeAst(parse(firstData), parse(secondData));
  const makeOutput = getFormatter(format);

  return makeOutput(ast);
};

export default makeDiff;
