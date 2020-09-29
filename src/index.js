import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import createAst from './createAst.js';
import getFormatter from './formatters/index.js';

const getParsedData = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const type = path.extname(fileName).slice(1);
  const content = fs.readFileSync(absolutePath, 'utf-8');

  return parse(content, type);
};

const makeDiff = (firstFileName, secondFileName, format) => {
  const render = getFormatter(format);
  const ast = createAst(getParsedData(firstFileName), getParsedData(secondFileName));

  return render(ast);
};

export default makeDiff;
