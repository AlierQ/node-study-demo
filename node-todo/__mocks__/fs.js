const { Argument } = require("commander");

// 拿到jets模拟的fs操作对象
const fs = jest.genMockFromModule("fs");
// 真实的fs
const _fs = jest.requireActual("fs");

// 将真实的fs的方法复制到mock的fs上
Object.assign(fs, _fs);

let readMocks = {};

// 自定义方法
fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data];
};

// 重写fs中的readFile方法
fs.readFile = (path, options, callback) => {
  if (arguments.length === 2) {
    callback = options;
  }
  // 做出一些限制
  // 如果路径是被mock过writeMocks的就不执行真实的fs中的readFile
  if (path in readMocks) {
    callback(...readMocks[path]);
  } else {
    // 如果路径是没有被mock过的就执行真的fs中的readFile
    // 调用真的fs中的readFile方法
    _fs.readFile(path, options, callback);
  }
};

// 测试写数据的Mock数据
let writeMocks = {};

fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn;
};

// 重写writeFile方法
fs.writeFile = (path, data, option, callback) => {
  // 没有可选参数时
  if (callback === undefined) {
    callback = option;
  }
  console.log(path, data);
  if (path in writeMocks) {
    writeMocks[path](path, data, option, callback);
  } else {
    // 调用真实的fs的writeFile方法
    _fs.writeFile(path, data, option, callback);
  }
};

fs.clearMocks = () => {
  readMocks = {};
  writeMocks = {};
};

module.exports = fs;
