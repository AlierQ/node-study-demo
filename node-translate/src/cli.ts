import * as commander from "commander";
// 引入main.ts提供的方法
import { translate } from "./main";

const program = new commander.Command();

// version 设置版本
// name 设置名称
program
  .version("0.0.1")
  .name("translate")
  .usage("<English>")
  .arguments("<English>")
  .action(function (english: string) {
    translate(english);
  });

program.parse(process.argv);
