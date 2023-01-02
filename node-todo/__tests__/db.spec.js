// 引入需要测试的方法对象
const db = require("../db.js");
// 引入node提供的 fs文件操作模块（这是真实的fs）
const fs = require("fs");
// 使用jest去模拟fs
jest.mock("fs");

// 对于db测试的描述
describe("db", () => {
  // 每次调用完it就会执行
  afterEach(() => {
    // 清空模拟的数据
    fs.clearMocks();
  });
  it("can read", async () => {
    const data = [{ title: "hi", done: false }];
    // 通过mock的fs中新增的setMock添加虚拟的数据
    fs.setReadFileMock("/xxx", null, JSON.stringify(data));
    const list = await db.read("/xxx");
    // 对比数组对象，使用严格意义上对象对比
    expect(list).toStrictEqual(data);
  });
  it("can write", async () => {
    // 假的数据对象
    let fakeFile = "";
    // 添加一个的模拟操作
    fs.setWriteFileMock("/yyy", (path, data, option, callback) => {
      fakeFile = data;
      callback(null);
    });
    // 要写入的数据
    const list = [{ title: "打豆豆", done: true }];
    // 调用db的写入方法，它会自动调用fs中的writeFile，但是这里调用的实际上是模拟的fs中的writeFile方法
    await db.write(list, "/yyy");
    // 进行测试
    expect(fakeFile).toBe(JSON.stringify(list) + "\n");
  });
});
