import _ from 'lodash';
import parsers from './parsers.js';

const render = (firstFile, secondFile) => {
  const keys = [...Object.keys(firstFile), ...Object.keys(secondFile)]
    .reduce((acc, key) => (acc.includes(key) ? [...acc] : [...acc, key]), []);

  const result = keys.reduce((acc, key) => {
    const firstValue = firstFile[key];
    const secondValue = secondFile[key];

    const neutralStr = `  ${key}: ${firstValue}\n`;
    const plusStr = `+ ${key}: ${secondValue}\n`;
    const minusStr = `- ${key}: ${firstValue}\n`;

    if (_.has(firstFile, key) && _.has(secondFile, key)) {
      return firstValue === secondValue ? [...acc, neutralStr] : [...acc, plusStr, minusStr];
    }

    return _.has(firstFile, key) ? [...acc, minusStr] : [...acc, plusStr];
  }, []);

  return `{\n${result.join('')}}`;
};

const makeDiff = (firstPath, secondPath) => {
  const firstFile = parsers(firstPath);
  const secondFile = parsers(secondPath);

  return render(firstFile, secondFile);
};

export default makeDiff;
