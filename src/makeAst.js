import _ from 'lodash';

const isObject = (data) => data instanceof Object;
const isEqual = (a, b) => a === b;

const makeAst = (first, second) => {
  const uniqKeys = _.uniq([...Object.keys(first), ...Object.keys(second)]).sort();

  const result = uniqKeys.reduce((acc, key) => {
    const firstValue = first[key];
    const secondValue = second[key];

    const unmodified = { status: 'unmodified', value: firstValue };
    const valueModified = { status: 'valueModified', newValue: secondValue, oldValue: firstValue };
    const deleted = { status: 'deleted', value: firstValue };
    const added = { status: 'added', value: secondValue };

    if (isObject(firstValue) && isObject(secondValue) && !isEqual(firstValue, secondValue)) {
      return { ...acc, [key]: { status: 'contentModified', value: makeAst(firstValue, secondValue) } };
    }

    if (_.has(first, key) && _.has(second, key)) {
      if (isEqual(firstValue, secondValue)) {
        return { ...acc, [key]: unmodified };
      }

      return { ...acc, [key]: valueModified };
    }

    return _.has(first, key) ? { ...acc, [key]: deleted }
      : { ...acc, [key]: added };
  }, {});

  return result;
};

export default makeAst;
