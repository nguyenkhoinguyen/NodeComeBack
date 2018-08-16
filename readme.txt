Nguyễn Khôi Nguyên Đẹp trai

var a = require('./hello.js');
var fs = require('fs');
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end("<p>Hi nguyễn khôi nguyên đep trai</p>");
}).listen(6194,"127.0.0.1",function () {
    console.log("Dang Lang Nghe");    
})