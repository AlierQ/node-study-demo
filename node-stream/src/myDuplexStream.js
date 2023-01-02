const { Duplex } = require("stream");

// 自定义Duplex 流
const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
  read(size) {
    const char = String.fromCharCode(this.currentCharCode++);
    this.push(char);
    console.log(`推送了数据：${char}`);
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  },
});

inoutStream.currentCharCode = 65;

process.stdin.pipe(inoutStream).pipe(process.stdout);
