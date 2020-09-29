#!/usr/bin/env node
import program from 'commander';
import makeDiff from '../index.js';

program
  .version('0.7.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: tree, plain or json', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = makeDiff(firstConfig, secondConfig, program.format);

    console.log(diff);
  });

program.parse(process.argv);
