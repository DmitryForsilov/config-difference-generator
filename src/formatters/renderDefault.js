
const spaces = (count) => `${' '.repeat(count)}`;

const renderDefault = (ast, spacesCount = 4) => {
  if (!(ast instanceof Object)) {
    return ast;
  }

  const keys = Object.keys(ast).sort();

  const result = keys.reduce((acc, key) => {
    const { status, value } = ast[key];
    const { newValue, oldValue } = ast[key];

    switch (status) {
      case 'unchanged':
        return [...acc, `${spaces(spacesCount)}${key}: ${renderDefault(value, spacesCount + 4)}\n`];
      case 'changed':
        return [...acc, `${spaces(spacesCount - 2)}+ ${key}: ${renderDefault(newValue, spacesCount + 4)}\n${spaces(spacesCount - 2)}- ${key}: ${renderDefault(oldValue, spacesCount + 4)}\n`];
      case 'added':
        return [...acc, `${spaces(spacesCount - 2)}+ ${key}: ${renderDefault(value, spacesCount + 4)}\n`];
      case 'deleted':
        return [...acc, `${spaces(spacesCount - 2)}- ${key}: ${renderDefault(value, spacesCount + 4)}\n`];
      default:
        break;
    }

    return [...acc, `${spaces(spacesCount)}${key}: ${ast[key]}\n`];
  }, []);

  return `{\n${result.join('')}${spaces(spacesCount - 4)}}`;
};

export default renderDefault;
