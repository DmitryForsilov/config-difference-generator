#!/usr/bin/env node

import commander from 'commander';
import makeDiff from '../index.js';

const program = new commander.Command();

program
  .version('1.7.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: plain, json or', 'default');

program.arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = makeDiff(firstConfig, secondConfig, program.format);
    console.log(diff);
  });

program.parse(process.argv);
