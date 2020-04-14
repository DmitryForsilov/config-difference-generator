
const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const renderPlain = (ast, prefix = '') => {
  const validPrefix = prefix === '' ? '' : `${prefix}.`;

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
        return `${renderPlain(children, `${validPrefix}${name}`)}`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${validPrefix}${name}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`;
      case 'added':
        return `Property '${validPrefix}${name}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${validPrefix}${name}' was deleted`;
      default:
        break;
    }

    return `ERROR: unknown node type - ${type}`;
  });

  return result
    .filter((item) => item !== null)
    .join('\n');
};

export default renderPlain;
