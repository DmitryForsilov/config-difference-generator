
import _ from 'lodash';

const isObject = (data) => data instanceof Object;

const templates = {
  unchanged(val) {
    return { status: 'unchanged', value: val };
  },
  changed(newVal, oldVal) {
    return { status: 'changed', newValue: newVal, oldValue: oldVal };
  },
  deleted(val) {
    return { status: 'deleted', value: val };
  },
  added(val) {
    return { status: 'added', value: val };
  },
};

const makeAst = (firstConfig, secondConfig) => {
  const keys = _.union(Object.keys(firstConfig), Object.keys(secondConfig)).sort();

  const result = keys.reduce((acc, key) => {
    const firstValue = firstConfig[key];
    const secondValue = secondConfig[key];

    if (isObject(firstValue) && isObject(secondValue)) {
      return { ...acc, [key]: templates.unchanged(makeAst(firstValue, secondValue)) };
    }

    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      if (firstValue === secondValue) {
        return { ...acc, [key]: templates.unchanged(firstValue) };
      }
      if (!(firstValue === secondValue)) {
        return { ...acc, [key]: templates.changed(secondValue, firstValue) };
      }
    }

    if (_.has(firstConfig, key)) {
      return { ...acc, [key]: templates.deleted(firstValue) };
    }
    return { ...acc, [key]: templates.added(secondValue) };
  }, {});

  return result;
};

export default makeAst;
