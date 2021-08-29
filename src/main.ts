import * as https from 'https';
import * as querystring from 'querystring';
import md5 = require('md5');
import {appId, appSecret} from './private';

export const translate = (word) => {
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);

  const query: string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid: appId + 1,
    salt,
    sign
    //q=banana&from=en&to=zh&appid=20210828000929671&salt=1435660288&sign=aa01e2f0a91ef722c47c06552c3a49ab
  });

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const request = https.request(options, (response) => {
    const chunks = [];
    response.on('data', (chunk) => {
      chunks.push(chunk);
    });
    response.on('end', () => {
      const string = Buffer.concat(chunks).toString();
      type BaiduResult = {
        error_code?: string;
        error_msg?: string;
        from: string;
        to: string;
        trans_result: {
          src: string;
          dst: string;
        }[]
      }
      const object: BaiduResult = JSON.parse(string);
      if (object.error_code) {
        console.log(object.error_code);
        if (object.error_code === '52003') {
          console.error('用户认证失败');
        } else {
          console.error(object.error_msg);
        }
        process.exit(2);
      } else {
        console.log(object.trans_result[0].dst);
        // 退出当前进程，0 表示没有错误
        process.exit(0);
      }
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
};
