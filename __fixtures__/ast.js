const ast = {
  common: {
    status: 'contentModified',
    value: {
      follow: { status: 'added', value: false },
      setting1: { status: 'unmodified', value: 'Value 1' },
      setting2: { status: 'deleted', value: 200 },
      setting3: {
        status: 'valueModified',
        newValue: {
          key: 'value',
        },
        oldValue: true,
      },
      setting6: {
        status: 'contentModified',
        value: {
          key: { status: 'unmodified', value: 'value' },
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
    status: 'contentModified',
    value: {
      baz: { status: 'valueModified', newValue: 'bars', oldValue: 'bas' },
      foo: { status: 'unmodified', value: 'bar' },
      nest: {
        status: 'valueModified',
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
