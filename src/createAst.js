import _ from 'lodash';

const createNode = (key, firstObject, secondObject, createAstFunc) => {
  const firstValue = firstObject[key];
  const secondValue = secondObject[key];

  const mapping = {
    deleted: () => ({ name: key, type: 'deleted', value: firstValue }),
    added: () => ({ name: key, type: 'added', value: secondValue }),
    nested: () => ({ name: key, type: 'nested', children: createAstFunc(firstValue, secondValue) }),
    unchanged: () => ({ name: key, type: 'unchanged', value: firstValue }),
    changed: () => ({
      name: key, type: 'changed', newValue: secondValue, oldValue: firstValue,
    }),
  };

  const nodeTypes = {
    deleted: { check: _.has(firstObject, key) && !_.has(secondObject, key) },
    added: { check: !_.has(firstObject, key) && _.has(secondObject, key) },
    nested: { check: _.isObject(firstValue) && _.isObject(secondValue) },
    unchanged: { check: firstValue === secondValue },
  };

  const currentNodeType = _.findKey(nodeTypes, 'check') || 'changed';

  return mapping[currentNodeType]();
};

const createAst = (firstObject, secondObject) => {
  const uniqueKeys = _.union(Object.keys(firstObject), Object.keys(secondObject));

  return uniqueKeys.map((key) => createNode(key, firstObject, secondObject, createAst));
};

export default createAst;
