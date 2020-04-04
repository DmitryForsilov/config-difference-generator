import yaml from 'js-yaml';
import ini from 'ini';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parsers = (data) => {
  const { fileData, extension } = data;
  const parser = parsersList[extension];

  return parser(fileData);
};

export default parsers;
