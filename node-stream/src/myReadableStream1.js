const { Readable } = require("stream");

// 创建一个可读的流
const inStream = new Readable();

// 先把数据push进入
inStream.push("ASRDFGHJK");
console.log("数据推送了！");
inStream.push("QWETRUYOI");
console.log("数据推送了！");
inStream.push(null); // 数据已经推完，后续不再有数据

// 然后再通过管到pipe流入系统输出流中
inStream.pipe(process.stdout);

// 上面这种方式将所有的数据读入了之后才能读出，这种方式不是很好
