
import _ from 'lodash';

const isObject = (data) => data instanceof Object;

const nodes = {
  nested(name, children) {
    return { name, type: 'nested', children };
  },

  unchanged(name, value) {
    return { name, type: 'unchanged', value };
  },

  changed(name, newValue, oldValue) {
    return {
      name, type: 'changed', newValue, oldValue,
    };
  },

  deleted(name, value) {
    return { name, type: 'deleted', value };
  },

  added(name, value) {
    return { name, type: 'added', value };
  },
};

const makeAst = (firstConfig, secondConfig) => {
  const keys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const result = keys.map((key) => {
    const firstValue = firstConfig[key];
    const secondValue = secondConfig[key];

    if (_.isEqual(firstValue, secondValue)) {
      return nodes.unchanged(key, firstValue);
    }

    if (isObject(firstValue) && isObject(secondValue)) {
      return nodes.nested(key, makeAst(firstValue, secondValue));
    }

    if (_.has(firstConfig, key) && _.has(secondConfig, key) && !(firstValue === secondValue)) {
      return nodes.changed(key, secondValue, firstValue);
    }

    if (_.has(firstConfig, key)) {
      return nodes.deleted(key, firstValue);
    }

    return nodes.added(key, secondValue);
  });

  return result;
};

export default makeAst;
