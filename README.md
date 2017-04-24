### 使用

`npm install` 安装依赖
`npm start` 运行

默认文本文件放在 `/text` 目录下，转换后缀为 `.txt` 的文件

~~如果想换格式修改 `readFile.js` 里的 `from_code`，编码格式详见 https://github.com/ashtuchkin/iconv-lite#supported-encodings~~

### update
改成了自动识别文件格式并转成 `utf-8`，同时支持命令行参数

```bash
// --ext 需要转换的文件后缀名，多文件后缀用英文'，'号分割
// --dir 需转换文件目录，格式为相对于当前目录
node readFile.js --ext txt,html --dir text
```