import renderTree from './renderTree.js';
import renderPlain from './renderPlain.js';
import renderJson from './renderJson.js';

const formatters = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (format) => formatters[format];
