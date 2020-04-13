
const spaces = (count) => `${' '.repeat(count)}`;

const renderTree = (ast, spacesCount = 4) => {
  if (!(ast instanceof Object)) {
    return ast;
  }

  const keys = Object.keys(ast).sort();

  const result = keys.reduce((acc, key) => {
    const { status, value } = ast[key];
    const { newValue, oldValue } = ast[key];

    switch (status) {
      case 'unchanged':
        return [...acc, `${spaces(spacesCount)}${key}: ${renderTree(value, spacesCount + 4)}`];
      case 'changed':
        return [...acc, `${spaces(spacesCount - 2)}+ ${key}: ${renderTree(newValue, spacesCount + 4)}\n${spaces(spacesCount - 2)}- ${key}: ${renderTree(oldValue, spacesCount + 4)}`];
      case 'added':
        return [...acc, `${spaces(spacesCount - 2)}+ ${key}: ${renderTree(value, spacesCount + 4)}`];
      case 'deleted':
        return [...acc, `${spaces(spacesCount - 2)}- ${key}: ${renderTree(value, spacesCount + 4)}`];
      default:
        break;
    }

    return [...acc, `${spaces(spacesCount)}${key}: ${ast[key]}`];
  }, []);

  return `{\n${result.join('\n')}\n${spaces(spacesCount - 4)}}`;
};

export default renderTree;
