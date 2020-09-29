import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  json: (content) => JSON.parse(content),
  yml: (content) => yaml.safeLoad(content),
  ini: (content) => ini.parse(content),
};

export default (content, type) => mapping[type](content);
