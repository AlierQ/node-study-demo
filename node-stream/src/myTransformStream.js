const { Transform } = require("stream");

// 自定义Transform Stream
// 将小写字母转换成大写字母
const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
