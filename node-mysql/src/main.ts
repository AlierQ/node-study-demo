// 使用mysql
var mysql = require("mysql");
// 创建一个关系
var connection = mysql.createConnection({
  host: "localhost", // 主机名 默认是localhost
  port: "3307", // 端口号 默认是3307，但是这里使用的docker 3307:3306 所以端口填3307
  user: "root",
  password: "123456",
});

connection.connect();

// 这里创建一个数据库
connection.query(
  "CREATE DATABASE IF NOT EXISTS test_db CHARACTER SET utf8mb4;",
  function (error: any, results: any, fields: any) {
    if (error) throw error;
    console.log("创建一个数据库test_db");
    console.log("The solution is: ", results);
  }
);

// 打开数据库test_db
connection.query("use test_db");

// 在test_db中创建一个table
connection.query(
  `CREATE TABLE IF NOT EXISTS test_table(id INT(11),name VARCHAR(25), password VARCHAR(25))`,
  function (error: any, results: any, fields: any) {
    if (error) throw error;
    console.log("在test_db中创建一张表");
    console.log("The solution is: ", results);
  }
);

// 插入数据
connection.query(
  `INSERT INTO test_table(id, name, password) VALUE (1001,'admin','123456')`,
  function (error: any, results: any, fields: any) {
    if (error) throw error;
    console.log("在表中插入数据");
    console.log("The solution is: ", results);
  }
);

connection.end();
