import renderDefault from './formatters/renderDefault.js';
import renderPlain from './formatters/renderPlain.js';
import parsers from './parsers.js';
import makeAst from './makeAst.js';

const formatters = {
  default: renderDefault,
  plain: renderPlain,
};

const makeDiff = (first, second, format) => {
  const ast = makeAst(parsers(first), parsers(second));
  const formatter = formatters[format];

  return formatter(ast);
};

export default makeDiff;
