
const makeSpaces = (count) => `${' '.repeat(count)}`;
const indent = 4;

const stringify = (value, spacesCount) => {
  if (!(value instanceof Object)) {
    return value;
  }

  const keys = Object.keys(value);

  return keys.map((key) => {
    const currentValue = value[key];

    return `{\n${makeSpaces(spacesCount)}${key}: ${currentValue}\n${makeSpaces(spacesCount - indent)}}`;
  });
};

const renderTree = (ast, spacesCount = indent) => {
  const result = ast.map((node) => {
    const {
      name,
      type,
      value,
      newValue,
      oldValue,
      children,
    } = node;

    switch (type) {
      case 'nested':
        return `${makeSpaces(spacesCount)}${name}: ${renderTree(children, spacesCount + indent)}`;
      case 'unchanged':
        return `${makeSpaces(spacesCount)}${name}: ${stringify(value, spacesCount + indent)}`;
      case 'changed':
        return `${makeSpaces(spacesCount - (indent / 2))}+ ${name}: ${stringify(newValue, spacesCount + indent)}\n${makeSpaces(spacesCount - (indent / 2))}- ${name}: ${stringify(oldValue, spacesCount + indent)}`;
      case 'added':
        return `${makeSpaces(spacesCount - (indent / 2))}+ ${name}: ${stringify(value, spacesCount + indent)}`;
      case 'deleted':
        return `${makeSpaces(spacesCount - (indent / 2))}- ${name}: ${stringify(value, spacesCount + indent)}`;
      default:
        throw new Error(`ERROR: unknown node type - ${type}`);
    }
  });

  return `{\n${result.join('\n')}\n${makeSpaces(spacesCount - indent)}}`;
};

export default renderTree;
