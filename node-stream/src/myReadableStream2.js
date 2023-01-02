const { Readable } = require("stream");

// 创建一个可读的流
const inStream = new Readable({
  read(size) {
    const char = String.fromCharCode(this.currentCharCode++);
    this.push(char);
    console.log(`推送了数据：${char}`);
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  },
});

inStream.currentCharCode = 65;

inStream.pipe(process.stdout);

// 这种方式调用了read方法才会推一次，如果不会要求全部推入
