// 导入文件操作fs
const fs = require("fs");
// node 获取home目录方法
const homedir = require("os").homedir();
// node 提供拼接路径的方法
const p = require("path");
// 使用p拼接出文件路径
const filePath = p.join(homedir, ".todo");
// 操作文件的对象
const db = {
  // 读取文件
  read(path = filePath) {
    return new Promise((resolve, reject) => {
      // fs.readFile是一个异步代码，所以可以使用promise进行包裹然后返回内容
      fs.readFile(
        path,
        {
          // flag：表示对文件按照什么模式进行操作
          // a+：读取和追加写入，文件不存在时创建文件
          flag: "a+",
        },
        (err, data) => {
          if (err) reject(err);
          let list;
          try {
            // 将文件中的内容转换成一个数组
            list = JSON.parse(data.toString());
          } catch (error) {
            // 转换失败的时候就使用[]进行代替
            list = [];
          }
          resolve(list);
        }
      );
    });
  },
  // 写入文件
  write(list, path = filePath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(list) + "\n", {}, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
};
// node 导出方法
module.exports = db;
