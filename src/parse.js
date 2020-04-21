import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data) => {
  const { content, type } = data;
  const parser = parsers[type];

  return parser(content);
};

export default parse;
