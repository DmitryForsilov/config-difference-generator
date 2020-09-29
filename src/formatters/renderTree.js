
const createIndent = (count) => `${' '.repeat(count)}`;
const defaultIndent = 4;

const createNodeIndent = (nodeType, depth) => {
  const currentIndent = defaultIndent * depth;
  const indentCount = nodeType === 'nested' || nodeType === 'unchanged'
    ? currentIndent
    : currentIndent - 2;

  return createIndent(indentCount);
};

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return `${value}`;
  }

  const entries = Object.entries(value);
  const indent = createIndent(defaultIndent * (depth + 1));
  const bracketIndent = createIndent((defaultIndent * depth));

  const processedValue = entries.map(([key, currentValue]) => `${indent}${key}: ${currentValue}`);

  return `{\n${processedValue.join('\n')}\n${bracketIndent}}`;
};

const renderNode = (node, depth, renderTreeFunc) => {
  const {
    name, type, value, newValue, oldValue, children,
  } = node;
  const indent = createNodeIndent(type, depth);

  const mapping = {
    nested: () => `${indent}${name}: {\n${renderTreeFunc(children, depth + 1)}\n${indent}}`,
    unchanged: () => `${indent}${name}: ${stringify(value, depth)}`,
    changed: () => `${indent}+ ${name}: ${stringify(newValue, depth)}\n${indent}- ${name}: ${stringify(oldValue, depth)}`,
    added: () => `${indent}+ ${name}: ${stringify(value, depth)}`,
    deleted: () => `${indent}- ${name}: ${stringify(value, depth)}`,
  };

  return mapping[type]();
};

const renderTree = (ast) => {
  const iterTree = (tree, depth) => tree
    .map((node) => renderNode(node, depth, iterTree))
    .join('\n');

  return `{\n${iterTree(ast, 1)}\n}`;
};

export default renderTree;
