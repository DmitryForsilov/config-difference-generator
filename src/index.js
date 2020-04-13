import path from 'path';
import fs from 'fs';
import getParser from './getParser.js';
import makeAst from './makeAst.js';
import getFormatter from './formatters/index.js';

const getParsedData = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const extension = path.extname(fileName);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  const parse = getParser(extension);

  return parse(fileData);
};

const makeDiff = (firstConfig, secondConfig, format) => {
  const firstData = getParsedData(firstConfig);
  const secondData = getParsedData(secondConfig);

  const ast = makeAst(firstData, secondData);
  const makeOutput = getFormatter(format);

  return makeOutput(ast);
};

export default makeDiff;
