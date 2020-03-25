import render from './render.js';
import parsers from './parsers.js';
import makeAst from './makeAst.js';

const makeDiff = (first, second) => {
  const ast = makeAst(parsers(first), parsers(second));

  return render(ast);
};

export default makeDiff;
