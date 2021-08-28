import * as https from 'https';
import * as querystring from 'querystring';
import md5 = require('md5');

export const translate = (word) => {
  console.log('word');
  console.log(word);

  const appId = '';
  const appSecret = '';
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);

  const query: string = querystring.stringify({
    q: word,
    from: 'en',
    to: 'zh',
    appid: appId,
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

  const req = https.request(options, (res) => {

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};
