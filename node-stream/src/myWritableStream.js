const { Writable } = require("stream");

// 创建一个自己的Stream 流
const myStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("用户输入的内容：\n" + chunk.toString() + "--AlierQ");
    callback();
  },
});

// 让用户输入的内容通过管道pipe流到myStream中
process.stdin.pipe(myStream);
