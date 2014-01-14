wxRobot
=======

微信接口服务 for nodejs

## Features

- 接受信息（文本、图片、语音、视频、音乐、图文）
- 回复信息（文本、图片、语音、视频、音乐、图文）


## Installation

```bash
npm install wxRobot
```

## Usage

```javascript
var wxRobot = require('wxRobot');
var config = {
	port: 3000, // optional, default to 3000
	TOKEN: "[your token]" // must be assigned
};

var robot = new wxRobot(config);

robot.onText(function(data, handler){
	console.log(data);
	handler.sendText('hello');
});

robot.run(function(){
	console.log('server run');
});
```

## docs

### 接收信息

接收不同信息类型的操作为：`robot.on[type](cb);`

* 文本信息：`robot.onText(cb);`
* 图片信息：`robot.onImage(cb);`
* 语音信息：`robot.onVoice(cb);`
* 视频信息：`robot.onVideo(cb);`
* 位置信息：`robot.onLocation(cb);`
* 链接信息：`robot.onLink(cb);`

`cb`为`function(data, handler){}`，例如

```javascript
robot.onText(function(data, handler){
	// 接收到的信息都在data里面
	// handler对象的方法用以回复信息
	// handler.sendText('hello');
});
```

### 回复信息