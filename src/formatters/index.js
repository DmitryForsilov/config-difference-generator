import renderTree from './renderTree.js';
import renderPlain from './renderPlain.js';

const formatters = {
  default: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format) => formatters[format];
