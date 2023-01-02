// stream流的基本使用
const fs = require("fs");
// 创建写入流
const stream = fs.createWriteStream("./txt/1.txt");

for (let i = 0; i < 100000; i++) {
  // 在写入流中进行写入
  stream.write(
    `这是第${i + 1}条数据，这里买你的内容是我通过循环进行写入的，不推荐阅读`
  );
}

stream.end(); // 关闭写入流

console.log("完成写入！");
