wxRobot
=======

微信接口服务 for nodejs

## Features

- 接受信息（文本、图片、语音、视频、音乐、图文）
- 回复信息（文本、图片、语音、视频、音乐、图文）


## Installation

```{bash}
npm install wxRobot
```

## Usage

```
var wxRobot = require('wxRobot');
var config = {
	port: 3000, //optional, default to 3000
	TOKEN: "[your token]" //must be assigned
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
