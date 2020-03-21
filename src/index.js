
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const makeDiff = (firstPath, secondPath) => {
  const firstAblolutePath = path.resolve(process.cwd(), firstPath);
  const secondAblolutePath = path.resolve(process.cwd(), secondPath);

  const firstFile = JSON.parse(fs.readFileSync(firstAblolutePath));
  const secondFile = JSON.parse(fs.readFileSync(secondAblolutePath));

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

export default makeDiff;
