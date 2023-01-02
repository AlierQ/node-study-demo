/**
 * 数据库：test_db
 * 数据表：test_sequelizes
 * 表中格式：
 * +----------+-------------+------+-----+---------+-------+
 * | Field    | Type        | Null | Key | Default | Extra |
 * +----------+-------------+------+-----+---------+-------+
 * | id       | int(11)     | YES  |     | NULL    |       |
 * | name     | varchar(25) | YES  |     | NULL    |       |
 * | password | varchar(25) | YES  |     | NULL    |       |
 * +----------+-------------+------+-----+---------+-------+
 */

const Sequelize = require("sequelize");
// 创建sequelize实例对象
const sequelize = new Sequelize("test_db", "root", "123456", {
  dialect: "mysql", // 方言，数据库类型
  host: "localhost", // 主机
  port: "3307", // 端口
  // 连接池设置
  pool: {
    max: 10, // 最大连接数
    min: 5, // 最小连接数
    idle: 10000,
  },
});

// 定义模型对象
let userModel = sequelize.define(
  "test_sequelize",
  {
    id: {
      type: Sequelize.INTEGER(11), // 数据类型
      primaryKey: true, // 主键
      comment: "id", // 属性说明
    },
    name: {
      type: Sequelize.STRING(25), // 数据类型
      comment: "用户名", // 属性说明
      // 数据类型检查
      validate: {
        isAlphanumeric: true, // 是否为数字和字母
      },
    },
    password: {
      type: Sequelize.STRING(25), // 数据类型
      comment: "密码", // 属性说明
    },
  },
  { timestamps: false } //关闭Sequelize的自动添加timestamp的功能
);

// 操作数据库
// 1、新增一条数据
userModel
  .create({
    id: "102",
    name: "tom",
    password: "efg",
  })
  .then((res) => {
    console.log("create: \n" + JSON.stringify(res));
  });

// 2、查询一条数据
(async () => {
  // let dataList = await userModel.findAll({}); // 无条件查询
  let dataList = await userModel.findAll({
    where: {
      // 条件查询
      id: "101",
    },
  });
  console.log("select: \n");
  for (let data of dataList) {
    console.log(JSON.stringify(data));
  }
})();

// 3、更新数据
(async () => {
  // let dataList = await userModel.findAll({}); // 无条件查询
  let dataList = await userModel.findAll({
    where: {
      // 条件查询
      id: "101",
    },
  });
  console.log("update: \n");
  for (let data of dataList) {
    data.name = "lucy";
    await data.save(); // 调用实例对象的save方法保存数据
  }
})();

// 4、删除数据
(async () => {
  // let dataList = await userModel.findAll({}); // 无条件查询
  let dataList = await userModel.findAll({
    where: {
      // 条件查询
      id: "101",
    },
  });
  console.log("update: \n");
  for (let data of dataList) {
    await data.destroy(); // 调用实例对象的destroy删除数据
  }
})();
