// 引入Node中的HTTP模块
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { IncomingMessage, ServerResponse } from "http";
// 创建一个server
const server = http.createServer();

// 资源文件夹路径
const publicDir = path.resolve(__dirname, "./public");
// 文件后缀与文件格式的哈希表
const hashMap: any = {
  html: "html",
  css: "css",
  js: "javascript",
};

const cacheTime = 3600 * 24 * 365;

// 监听request事件,一旦有人请求（触发request事件）就执行回调函数
// request: IncomingMessages是为request添加实际类型，增加代码提示
server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: requestUrl, headers } = request;
  // 过滤method，不允许使用post请求
  if (method !== "GET") {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.statusCode = 405;
    response.write("不能发送非GET请求");
    response.end();
    return;
  }
  // 通过url提供的parse方法分析request的url得到一个url对象
  // pathname：表示不包含查询参数的路径
  // search：表示查询参数
  const { pathname, search } = url.parse(requestUrl as string);
  // 获取文件名
  let filename = pathname?.substring(1) || "index.html";
  // 按照“.”分割文件名
  let fileNameArr = filename?.split(".");
  // 获取文件后缀，便于返回文件的格式
  let suffix = fileNameArr[fileNameArr.length - 1];
  fs.readFile(
    // 使用path提供的resolve进行路径和文件的拼接（并非字符串直接拼接）
    path.resolve(publicDir, filename as string),
    {
      flag: "r",
    },
    (err, data) => {
      if (err) {
        console.log(err);
        if (err.errno === -4058) {
          response.statusCode = 404;
          response.write("访问资源不存在！");
        } else if (err.errno === -4068) {
          response.statusCode = 403;
          response.write("无权限访问目录！");
        } else {
          response.statusCode = 500;
          response.write("服务器内部错误！");
        }
      } else {
        response.setHeader(
          "Content-Type",
          `text/${hashMap[suffix]}; charset=utf-8`
        );
        response.setHeader("Cache-Control", `public, max-age=${cacheTime}`);
        response.write(data);
      }
      response.end();
    }
  );
});
// 监听8888端口
server.listen(8888);
