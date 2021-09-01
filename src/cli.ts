#!/user/bin/env node
import * as commander from 'commander';
import {translate} from './main';

const program = new commander.Command();

program.version('0.0.1')
  .name('i18n')
  .usage('<English>')
  .arguments('<English>')
  .action(function (english) {
    translate(english);
  });


// 对参数进行解析
program.parse(process.argv);
