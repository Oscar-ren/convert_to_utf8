/**
 * 修改文件编码格式，例如：GBK转UTF8
 * 支持多级目录
 * @param {String} [root_path] [需要进行转码的文件路径]
 * @param {Array}  [file_type] [需要进行转码的文件格式，比如html文件]
 * @param {String} [from_code] [文件的编码，采用自动识别方式，不用修改]
 * @param {String} [to_code]   [文件的目标编码]
 */

// 引入包
var fs = require('fs'),
    path = require('path'),
    iconv = require('iconv-lite');

var argv = require('minimist')(process.argv.slice(2), {
    default: {
        ext: 'txt'
    }
});
var jschardet = require("jschardet");
// jschardet.Constants._debug = true;


// 全局变量
var root_path = argv.dir || './text',
    file_type = argv.ext.split(","),
    to_code   = 'utf8',
    from_code;

/**
 * 转码函数
 * @date   2015-01-13
 * @param  {[String]}   root [编码文件目录]
 * @return {[type]}        [description]
 */
function encodeFiles(root) {
    "use strict";
    var files = fs.readdirSync(root);
    files.forEach(function(file) {
        var pathname = root + '/' + file,
            stat = fs.lstatSync(pathname);
        if (!stat.isDirectory()) {
            var name = file.toString();
            if(file_type.indexOf(name.substring((name.lastIndexOf('.') + 1))) < 0) {
                return;
            }

            from_code = jschardet.detect(fs.readFileSync(pathname)).encoding;
            if(from_code === 'UTF-8') {
                return;
            }

            fs.writeFile(pathname, iconv.decode(fs.readFileSync(pathname), from_code), {
                encoding: to_code
            }, function(err) {
                if (err) {
                    throw err;
                }
                console.log(file + " decode");
            });
        } else {
            encodeFiles(pathname);
        }
    });
}
encodeFiles(root_path);


module.exports = encodeFiles;