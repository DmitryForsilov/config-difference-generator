#!/usr/bin/env node

import commander from 'commander';
import makeDiff from '../index.js';

const program = new commander.Command();

program
  .version('1.3.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program.arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = makeDiff(firstConfig, secondConfig);
    console.log(diff);
  });

program.parse(process.argv);
