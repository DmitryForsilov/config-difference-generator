import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const format = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath);

  return (format === 'json') ? JSON.parse(data) : yaml.safeLoad(data);
};

export default parsers;
