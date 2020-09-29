import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const renderNode = (node, path = '', renderPlainFunc) => {
  const {
    name, type, value, newValue, oldValue, children,
  } = node;
  const currentPath = path === '' ? `${path}${name}` : `${path}.${name}`;

  const mapping = {
    nested: () => renderPlainFunc(children, currentPath),
    changed: () => `Property '${currentPath}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`,
    added: () => `Property '${currentPath}' was added with value: ${stringify(value)}`,
    deleted: () => `Property '${currentPath}' was deleted`,
    unchanged: () => null,
  };

  return mapping[type]();
};

const renderPlain = (ast, path = '') => {
  const result = ast.map((node) => renderNode(node, path, renderPlain));

  return result
    .filter((item) => item !== null)
    .join('\n');
};

export default renderPlain;
