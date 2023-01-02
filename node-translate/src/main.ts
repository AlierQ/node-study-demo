// md5工具
import md5 from "blueimp-md5";
// axios
import axios from "axios";

// 导出translate方法
export const translate = (english: string) => {
  const bashTranslateUrl =
    "https://fanyi-api.baidu.com/api/trans/vip/translate";
  const date = new Date();
  const appid = "20220926001354393";
  const pwd = "BYAzLhEiBFZwO54qLZ8u";
  let from: string, to: string;
  if (/[a-zA-Z]/.test(english)) {
    // 英译汉
    from = "en";
    to = "zh";
  } else {
    // 汉译英
    from = "zh";
    to = "en";
  }
  // 接口所需参数
  const params = {
    q: english,
    salt: ((date as any) - 0).toString(),
    to,
    from,
    appid,
  };
  // 根据百度翻译接口要求进行md5的加密
  const sign = md5(params.appid + params.q + params.salt + pwd);
  // 向百度翻译API发起请求
  axios
    .get(bashTranslateUrl, {
      // 参数
      params: {
        ...params,
        sign,
      },
    })
    .then(
      (res) => {
        if (res.status === 200) {
          // 返回结果的类型
          type TranslateResult = {
            from: string;
            to: string;
            trans_result: { src: string; dst: string }[];
            error_code?: string;
            error_msg?: string;
          };
          const result: TranslateResult = res.data;
          if (result.error_code) {
            console.log(result.error_msg);
            process.exit(2); // 退出当前进程，并且使用2表示有错误
          } else {
            console.log(result.trans_result[0].dst);
            process.exit(0); // 退出当前进程，并且使用0表示没有错误
          }
        }
      },
      (err) => {}
    );
};
