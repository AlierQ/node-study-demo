// 提供的功能

// 引入操作文件的接口对象
const db = require("./db");

const inquirer = require("inquirer");

// 导出 add 功能
module.exports.add = async (title) => {
  // 读取文件
  const list = await db.read();
  // 添加任务
  list.push({ title, done: false });
  // 存储任务到文件中
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};

module.exports.show = async () => {
  const list = await db.read();
  // 打印任务
  printTask(list);
};

// 打印任务
function printTask(list) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "index",
        message: "请选择你想操作的任务",
        choices: [
          { name: "放弃操作", value: "-1" },
          ...list.map((element, index) => {
            return {
              name: `${element.done ? "[✔]" : "[_]"} [${index + 1}] ${
                element.title
              }`,
              value: index.toString(),
            };
          }),
          { name: "创建任务", value: "-2" },
        ],
      },
    ])
    .then((answers1) => {
      const index = parseInt(answers1.index);
      if (index >= 0) {
        // 选中一个任务
        askForAction(list, index);
      } else if (index === -2) {
        // 创建任务
        askCreateTask(list);
      }
    });
}

// 询问操作
function askForAction(list, index) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "请选择你要执行的操作",
        choices: [
          { name: "放弃操作", value: "quit" },
          { name: "标记为已完成", value: "markAsDone" },
          { name: "标记为未完成", value: "markAsUndone" },
          { name: "修改标题", value: "updateTitle" },
          { name: "删除", value: "delete" },
        ],
      },
    ])
    .then((answers2) => {
      switch (answers2.action) {
        case "quit":
          break;
        case "markAsDone":
          list[index].done = true;
          db.write(list);
          break;
        case "markAsUndone":
          list[index].done = false;
          db.write(list);
          break;
        case "updateTitle":
          askUpdateTask(list, index);
          break;
        case "delete":
          list.splice(index - 1, 1);
          break;
      }
    });
}

// 询问是否更新
function askUpdateTask(list, index) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "请输入标题",
      },
    ])
    .then((answers3) => {
      list[index].title = answers3.title;
      db.write(list);
    });
}

// 询问是否创建
function askCreateTask(list) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "请输入任务标题",
      },
    ])
    .then((answers4) => {
      list.push({
        title: answers4.title,
        done: false,
      });
      db.write(list);
    });
}
