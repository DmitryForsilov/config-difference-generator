import parsers from './parsers.js';
import makeAst from './makeAst.js';
import renderDefault from './formatters/renderDefault.js';
import renderPlain from './formatters/renderPlain.js';
import renderJson from './formatters/renderJson.js';

const formatters = {
  default: renderDefault,
  plain: renderPlain,
  json: renderJson,
};

const makeDiff = (first, second, format) => {
  const ast = makeAst(parsers(first), parsers(second));
  const formatter = formatters[format];

  return formatter(ast);
};

export default makeDiff;
