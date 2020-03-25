
const spaces = (count) => `${' '.repeat(count)}`;

const render = (ast, spacesCount = 4) => {
  if (!(ast instanceof Object)) {
    return ast;
  }

  const keys = Object.keys(ast).sort();

  const result = keys.reduce((acc, key) => {
    const { status, value } = ast[key];
    const { newValue, oldValue } = ast[key];

    switch (status) {
      case 'unmodified':
        return [...acc, `${spaces(spacesCount)}${key}: ${render(value, spacesCount + 4)}\n`];
      case 'contentModified':
        return [...acc, `${spaces(spacesCount)}${key}: ${render(value, spacesCount + 4)}\n`];
      case 'valueModified':
        return [...acc, `${spaces(spacesCount - 2)}+ ${key}: ${render(newValue, spacesCount + 4)}\n${spaces(spacesCount - 2)}- ${key}: ${render(oldValue, spacesCount + 4)}\n`];
      case 'added':
        return [...acc, `${spaces(spacesCount - 2)}+ ${key}: ${render(value, spacesCount + 4)}\n`];
      case 'deleted':
        return [...acc, `${spaces(spacesCount - 2)}- ${key}: ${render(value, spacesCount + 4)}\n`];
      default:
        break;
    }

    return [...acc, `${spaces(spacesCount)}${key}: ${ast[key]}\n`];
  }, []);

  return `{\n${result.join('')}${spaces(spacesCount - 4)}}`;
};

export default render;
