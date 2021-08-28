import * as commander from 'commander';

const program = new commander.Command();

program.version('0.0.1')
  .name('i18n')
  .usage('<english>');


// 对参数进行解析
program.parse(process.argv);
