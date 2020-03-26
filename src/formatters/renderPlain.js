
const isObject = (data) => data instanceof Object;
const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const renderPlain = (ast, ancestor = '') => {
  const validAncestor = ancestor === '' ? '' : `${ancestor}.`;

  const keys = Object.keys(ast).sort();

  const result = keys.reduce((acc, key) => {
    const { status, value } = ast[key];
    const { newValue, oldValue } = ast[key];

    if (status === 'unchanged' && isObject(value)) {
      return [...acc, `${renderPlain(value, `${validAncestor}${key}`)}`];
    }
    if (status === 'changed') {
      return [...acc, `Property '${validAncestor}${key}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`];
    }
    if (status === 'added') {
      return [...acc, `Property '${validAncestor}${key}' was added with value: ${stringify(value)}`];
    }
    if (status === 'deleted') {
      return [...acc, `Property '${validAncestor}${key}' was deleted`];
    }

    return acc;
  }, []);

  return result.join('\n');
};

export default renderPlain;
