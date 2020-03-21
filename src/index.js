
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);

  return JSON.parse(fs.readFileSync(absolutePath));
};

const makeDiff = (firstPath, secondPath) => {
  const firstFile = readFile(firstPath);
  const secondFile = readFile(secondPath);

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
