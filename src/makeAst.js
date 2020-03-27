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

const makeAst = (first, second) => {
  const uniqKeys = _.uniq([...Object.keys(first), ...Object.keys(second)]).sort();

  const result = uniqKeys.reduce((acc, key) => {
    const firstValue = first[key];
    const secondValue = second[key];

    if (isObject(firstValue) && isObject(secondValue) && !(firstValue === secondValue)) {
      return { ...acc, [key]: templates.unchanged(makeAst(firstValue, secondValue)) };
    }

    if (_.has(first, key) && _.has(second, key)) {
      if (firstValue === secondValue) {
        return { ...acc, [key]: templates.unchanged(firstValue) };
      }
      return { ...acc, [key]: templates.changed(secondValue, firstValue) };
    }

    if (_.has(first, key)) {
      return { ...acc, [key]: templates.deleted(firstValue) };
    }
    return { ...acc, [key]: templates.added(secondValue) };
  }, {});

  return result;
};

export default makeAst;
