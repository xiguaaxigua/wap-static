'use strict';

/**
 * Created by xiangran.kong on 16/07/28.
 */

var path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
    devtool: 'source-map', //生成sourcemap.便于开发调试
    entry: {
        common: ['./src/js/common', './src/js/class/popup.class'],    //公共文件，每个文件都使用
        search: ['./src/js/search'],    //搜索功能所使用js
        user: ['./src/js/class/verification.class'],   //表单验证所使用js,用户中心js，包括我的订单
        cart: ['./src/js/cart','./src/js/class/addCart.class','./src/js/class/addFav.class'],    //购物车页面使用js，包括优惠券，赠品
        product: ['./src/js/class/popup.class'],    //用户选择地址，操作地址
        address: ['./src/js/class/addCart.class','./src/js/class/addFav.class'],
        checkout: ['./src/js/class/popup.class'],    //结算中心，包括结尾
        order: ['./src/js/class/popup.class']       //订单所用JS，包括结算，选择/编辑地址，配送时间，支付方式发票
    }, //获取项目入口JS文件, 支持数组形式， ["./entry1", "./entry2"]
    output: {
        path: path.join(__dirname, 'dist/js'), //文件输出目录
        publicPath: 'dist/js/', //用于配置文件发布路径，如CDN或本地服务器
        filename: '[name].js' //根据入口文件输出的对应多个文件名
    },
    module: {
        loaders: [{ test: /\.js$/, loader: 'babel' }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    }
};
