import _ from 'lodash';

const makeAst = (firstFile, secondFile) => {
  const uniqKeys = _.uniq([...Object.keys(firstFile), ...Object.keys(secondFile)]);

  const result = uniqKeys.reduce((acc, key) => {
    const firstValue = firstFile[key];
    const secondValue = secondFile[key];

    const unmodified = { status: 'unmodified', value: firstValue };
    const modified = { status: 'modified', newValue: secondValue, oldValue: firstValue };
    const deleted = { status: 'deleted', value: firstValue };
    const added = { status: 'added', value: secondValue };

    if (_.has(firstFile, key) && _.has(secondFile, key)) {
      return firstValue === secondValue ? { ...acc, [key]: unmodified }
        : { ...acc, [key]: modified };
    }

    return _.has(firstFile, key) ? { ...acc, [key]: deleted }
      : { ...acc, [key]: added };
  }, {});

  return result;
};

export default makeAst;
