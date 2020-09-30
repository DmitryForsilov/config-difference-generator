[![Maintainability](https://api.codeclimate.com/v1/badges/8baf51a1b2d7ac4add34/maintainability)](https://codeclimate.com/github/DmitryForsilov/config-difference-generator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8baf51a1b2d7ac4add34/test_coverage)](https://codeclimate.com/github/DmitryForsilov/config-difference-generator/test_coverage)
![Node.js CI](https://github.com/DmitryForsilov/config-difference-generator/workflows/Node.js%20CI/badge.svg)

## Config Difference Generator

This is utility running from terminal.
Compares two configuration files and shows a difference in three output formats: default, plain and json.
Supported config file types: JSON, YAML and INI.

This project was reviewed by Hexlet.

## Install
```
npm i -g config-difference-generator
```
## Usage
Type in terminal from folder with config files:
```
gendiff -f [output format] <first-config> <second-config>
```

### Options
```
  -V, --version        output the version number
  -f, --format [type]  output format: tree, plain or json (default: "tree")
  -h, --help           display help for command
```

## Used in project:
- **commander**
- **ini** and **js-yaml** parsers
- **lodash**
- **jest**
- **eslint**

## Different config types in default output format
 - [JSON](https://github.com/DmitryForsilov/config-difference-generator/#json-difference)
 - [YAML](https://github.com/DmitryForsilov/config-difference-generator/#yaml-difference)
 - [INI](https://github.com/DmitryForsilov/config-difference-generator/#ini-difference)

## Output formats
 - [Default](https://github.com/DmitryForsilov/config-difference-generator/#default)
 - [Plain](https://github.com/DmitryForsilov/config-difference-generator/#plain)
 - [Json](https://github.com/DmitryForsilov/config-difference-generator/#json)

## Different config types
### JSON
<img width="700" src="./asciinema_svg/jsonInDefault.svg">

### YAML
<img width="700" src="./asciinema_svg/yamlInDefault.svg">

### INI
<img width="700" src="./asciinema_svg/iniInDefault.svg">

## Output formats
### Default
<img width="700" src="./asciinema_svg/defaultFormat.svg">

### Plain
<img width="700" src="./asciinema_svg/plainFormat.svg">

### Json
<img width="700" src="./asciinema_svg/jsonFormat.svg">
