#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program.arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {

  });

program.parse(process.argv);
