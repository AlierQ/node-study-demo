#!/usr/bin/env node
const { program } = require("commander");
const api = require("./index.js");

program
  .command("add <task>")
  .description("add a task")
  .action((task) => {
    api.add(task);
  });

program
  .command("clear")
  .description("clear all todo")
  .action(() => {
    api.clear();
  });

program
  .command("ls")
  .description("show all todo")
  .action(() => {
    api.show();
  });

// 分析语法
program.parse(process.argv);
