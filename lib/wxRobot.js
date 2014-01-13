var Handler, capitalize, checkSignature, express, http, msgTypes, wxRobot, xml2js, _;

express = require('express');

http = require('http');

_ = require('lodash');

Handler = require('./Handler');

checkSignature = require('./middleware/checkSignature');

xml2js = require('./middleware/xml2js');

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
        return _this._cb[type] = cb;
      };
    });
  }

  wxRobot.prototype.run = function(cb) {
    var app,
      _this = this;
    if (cb == null) {
      cb = function() {};
    }
    app = express();
    app.get('/', express.bodyParser(), checkSignature(this.option.TOKEN));
    app.post('/', xml2js(), function(req, res, next) {
      var dataType, handler, _base;
      dataType = req.data.MsgType;
      handler = new Handler(req, res);
      return typeof (_base = _this._cb)[dataType] === "function" ? _base[dataType](req.data, handler) : void 0;
    });
    return http.createServer(app).listen(this.option.port, cb);
  };

  return wxRobot;

})();

module.exports = wxRobot;
