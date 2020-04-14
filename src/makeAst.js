
import _ from 'lodash';

const isObject = (data) => data instanceof Object;

const makeAst = (firstConfig, secondConfig) => {
  const keys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return keys.map((key) => {
    const firstValue = firstConfig[key];
    const secondValue = secondConfig[key];

    if (isObject(firstValue) && isObject(secondValue)) {
      return { name: key, type: 'nested', children: makeAst(firstValue, secondValue) };
    }

    if (firstValue === secondValue) {
      return { name: key, type: 'unchanged', value: firstValue };
    }

    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      return {
        name: key, type: 'changed', newValue: secondValue, oldValue: firstValue,
      };
    }

    if (_.has(firstConfig, key)) {
      return { name: key, type: 'deleted', value: firstValue };
    }

    return { name: key, type: 'added', value: secondValue };
  });
};

export default makeAst;
