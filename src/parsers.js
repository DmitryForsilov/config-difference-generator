import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (fileName) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const format = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      break;
  }

  return `${fileName} file has unsupported format`;
};

export default parsers;
