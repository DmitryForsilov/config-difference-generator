import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (fileData) => {
  const { data, extension } = fileData;
  const parser = parsers[extension];

  return parser(data);
};

export default parse;
