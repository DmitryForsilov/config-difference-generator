const ast = {
  common: {
    status: 'unchanged',
    value: {
      follow: { status: 'added', value: false },
      setting1: { status: 'unchanged', value: 'Value 1' },
      setting2: { status: 'deleted', value: 200 },
      setting3: {
        status: 'changed',
        newValue: {
          key: 'value',
        },
        oldValue: true,
      },
      setting6: {
        status: 'unchanged',
        value: {
          key: { status: 'unchanged', value: 'value' },
          ops: { status: 'added', value: 'vops' },
        },
      },
      setting4: { status: 'added', value: 'blah blah' },
      setting5: {
        status: 'added',
        value: {
          key5: 'value5',
        },
      },
    },
  },
  group1: {
    status: 'unchanged',
    value: {
      baz: { status: 'changed', newValue: 'bars', oldValue: 'bas' },
      foo: { status: 'unchanged', value: 'bar' },
      nest: {
        status: 'changed',
        newValue: 'str',
        oldValue: {
          key: 'value',
        },
      },
    },
  },
  group2: {
    status: 'deleted',
    value: {
      abc: 12345,
    },
  },
  group3: {
    status: 'added',
    value: {
      fee: 100500,
    },
  },
};

export default ast;
