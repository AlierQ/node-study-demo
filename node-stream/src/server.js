// 引入文件模块
const fs = require("fs");
// 引入http模块
const http = require("http");

// 创建一个server服务
const server = http.createServer();

// 监听server服务
server.on("request", (request, response) => {
  // 使用fs readFile 读取文件
  fs.readFile("./txt/1.txt", (err, data) => {
    response.end(data);
    console.log("响应完成");
  });

  // 使用stream createReadStream 读取文件
  // const stream = fs.createReadStream("./txt/1.txt"); // 读取流
  // stream.pipe(response); // 通过pipe管道从fs读取流 -> http response流中
});

// 监听端口
server.listen(8989);
