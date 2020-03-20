
import { resolve } from 'path';
import fs from 'fs';
import _ from 'lodash';

const makeAbsolutePath = (path) => {
  const currentDir = process.cwd();

  if (path[0] === '/') {
    return `${currentDir}${path}`;
  }

  return resolve(currentDir, path);
};

const makeDiff = (firstPath, secondPath) => {
  const firstAblolutePath = makeAbsolutePath(firstPath);
  const secondAblolutePath = makeAbsolutePath(secondPath);

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
