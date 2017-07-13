var gulp = require('gulp');
var browserSync = require("browser-sync").create();//设置代理
var proxyMiddleware = require('http-proxy-middleware');

var FOLDER='./src/';
var SERVER_PORT=9999;
var SERVER_PROXY = "http://www.iclassedu.com";

var proxy = proxyMiddleware("/rest", {
    target: SERVER_PROXY,
    changeOrigin: true
});

gulp.task('default',function () {

    browserSync.init({
        port:SERVER_PORT,
        ghostMode:false,
        server:FOLDER,
        //middleware: [proxy]
    });
});