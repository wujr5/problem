const fs = require('fs');
const request = require('request');
let url = 'http://mlook.oss-cn-beijing.aliyuncs.com/statics/images/campaign/look-icon-new.png';

// 方式 1：可写流
request(url).pipe(fs.createWriteStream('test-1.data'));

// 方式 2：回调函数
request(url, function(err, response, body) {
  if (!err) {
    fs.writeFileSync('test-2.data', body);
  }
})

// 方式 3：http 模块
var http = require('http'),
Stream = require('stream').Transform;

http.request(url, function(response) {
  var data = new Stream();

  response.on('data', function(chunk) {
    data.push(chunk);
  });

  response.on('end', function() {
    fs.writeFileSync('test-3.data', data.read());
  });
}).end();

