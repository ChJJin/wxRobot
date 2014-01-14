var Handler, capitalize, checkSignature, exports, express, http, key, msgTypes, session, wxRobot, xml2js, _,
  __slice = [].slice;

express = require('express');

http = require('http');

_ = require('lodash');

Handler = require('./Handler');

checkSignature = require('./middleware/checkSignature');

xml2js = require('./middleware/xml2js');

session = require('./middleware/session');

msgTypes = ['text', 'image', 'voice', 'video', 'location', 'link'];

capitalize = function(str) {
  return str[0].toUpperCase() + str.slice(1);
};

wxRobot = (function() {
  function wxRobot(option) {
    var _this = this;
    this.option = option != null ? option : {
      port: 3000
    };
    this._cb = {};
    _.forEach(msgTypes, function(type) {
      return _this["on" + (capitalize(type))] = function(cb) {
        _this._cb[type] = cb;
        return _this;
      };
    });
    this.app = express();
    this.app.use(express.query());
    this.app.use(xml2js());
  }

  wxRobot.prototype.use = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this.app.use.apply(this.app, args);
  };

  wxRobot.prototype.run = function(path, cb) {
    var _this = this;
    if (path == null) {
      path = '/';
    }
    if (cb == null) {
      cb = function() {};
    }
    this.app.get(path, checkSignature(this.option.TOKEN));
    this.app.post(path, session(), function(req, res, next) {
      var dataType, handler, _base;
      dataType = req.wxData.MsgType;
      handler = new Handler(req, res);
      return typeof (_base = _this._cb)[dataType] === "function" ? _base[dataType](req.wxData, handler) : void 0;
    });
    return http.createServer(this.app).listen(this.option.port, cb);
  };

  return wxRobot;

})();

exports = module.exports = wxRobot;

for (key in express) {
  Object.defineProperty(exports, key, Object.getOwnPropertyDescriptor(express, key));
}
