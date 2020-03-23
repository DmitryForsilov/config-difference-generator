
const render = (ast) => {
  const keys = Object.keys(ast);

  const result = keys.reduce((acc, key) => {
    const { status, value } = ast[key];
    const { newValue, oldValue } = ast[key];

    const strings = {
      unmodified: `  ${key}: ${value}\n`,
      modified: `+ ${key}: ${newValue}\n- ${key}: ${oldValue}\n`,
      added: `+ ${key}: ${value}\n`,
      deleted: `- ${key}: ${value}\n`,
    };

    return [...acc, strings[status]];
  }, []);

  return `{\n${result.join('')}}`;
};

export default render;
