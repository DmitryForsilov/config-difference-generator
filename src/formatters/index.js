import renderTree from './renderTree.js';
import renderPlain from './renderPlain.js';

const formatters = {
  tree: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format) => formatters[format];
