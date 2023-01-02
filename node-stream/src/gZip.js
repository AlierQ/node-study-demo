// 利用Stream实现加密压缩
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];
// 加密模块
const crypto = require("crypto");

const { Transform } = require("stream");

// 进度条
const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(".");
    callback(null, chunk);
  },
});

fs.createReadStream(file)
  .pipe(crypto.createCipher("aes192", "abc123456")) // 加密
  .pipe(zlib.createGzip()) // 压缩
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + ".gz"))
  .on("finish", () => {
    process.stdout.write("\nDone\n");
  });
