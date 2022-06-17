# wechat-typecho


# 需要修改适配的地方

1. manifest.json 

```json
{
    "name" : "芒果小屋", //改为自己小程序名称
    "appid" : "__UNI__EAB0F35",
    "description" : "",
    "versionName" : "芒果小屋",//改为自己小程序名称
    "versionCode" : 214,
    "transformPx" : false,
...
```

2. pagee.json

```json
//...
"globalStyle": {
    "mp-alipay": {
        /* 支付宝小程序特有相关 */
        "transparentTitle": "always",
        "allowsBounceVertical": "NO"
    },
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTitleText": "芒果小屋",//改为自己小程序名称
    "navigationBarTextStyle": "black"
},
//...
```

3. project.private.config.json

```json
{
  "appid": "wx676c70d70f0810ae",//改为自己小程序的appid,可以通过微信开发者工具获取
  "compileType": "miniprogram",
  "libVersion": "2.24.6",
  "packOptions": {
    "ignore": [],
    "include": []
  },
  "setting": {
//...
```

4. utils/api.js

```js
var domain = "mangoroom.cn"; //改为自己的博客域名
var apisec = "xxx"; //改为博客插件中的apisec密钥
var API_URL = 'https://' + domain + '/api/';
//...
```


5. static/towxml/config.js

```json
// 数学公式解析API
latex:{
    api:'http://towxml.vvadd.com/?tex'  //替换为自己的解析服务地址
},

// yuml图解析APPI
yuml:{
    api:'http://towxml.vvadd.com/?yuml' //替换为自己的解析服务地址
},
```