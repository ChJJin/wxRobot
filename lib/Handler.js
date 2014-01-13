var Handler, compiled, getBaseInfo, msgTypes, _;

_ = require('lodash');

msgTypes = ['text', 'image', 'voice', 'video', 'music', 'news'];

compiled = {};

_.forEach(msgTypes, function(type) {
  return compiled[type] = _.template(require("./replyDataFormat/" + type + "Format"));
});

Handler = (function() {
  function Handler(req, res) {
    this.req = req;
    this.res = res;
  }

  Handler.prototype.sendText = function(content) {
    var info, msg;
    info = _.assign(getBaseInfo(this.req.data), {
      Content: content
    });
    msg = compiled['text'](info);
    return this.reply(msg);
  };

  Handler.prototype.sendImage = function(mediaId) {
    var info, msg;
    info = _.assign(getBaseInfo(this.req.data), {
      MediaId: mediaId
    });
    msg = compiled['image'](info);
    return this.reply(msg);
  };

  Handler.prototype.sendVoice = function(mediaId) {
    var info, msg;
    info = _.assign(getBaseInfo(this.req.data), {
      MediaId: mediaId
    });
    msg = compiled['voice'](info);
    return this.reply(msg);
  };

  Handler.prototype.sendVideo = function(option) {
    var info, msg, _ref, _ref1, _ref2;
    info = _.assign(getBaseInfo(this.req.data), {
      MediaId: (_ref = option.mediaId) != null ? _ref : option.MediaId,
      Title: (_ref1 = option.title) != null ? _ref1 : option.Title,
      Description: (_ref2 = option.description) != null ? _ref2 : option.Description
    });
    msg = compiled['video'](info);
    return this.reply(msg);
  };

  Handler.prototype.sendMusic = function(option) {
    var info, msg, _ref, _ref1, _ref2, _ref3, _ref4;
    info = _.assign(getBaseInfo(this.req.data), {
      MusicUrl: (_ref = option.musicUrl) != null ? _ref : option.MusicUrl,
      HQMusicUrl: (_ref1 = option.HQmusicUrl) != null ? _ref1 : option.HQMusicUrl,
      ThumbMediaId: (_ref2 = option.thumbMediaId) != null ? _ref2 : option.ThumbMediaId,
      Title: (_ref3 = option.title) != null ? _ref3 : option.Title,
      Description: (_ref4 = option.description) != null ? _ref4 : option.Description
    });
    msg = compiled['music'](info);
    return this.reply(msg);
  };

  Handler.prototype.sendNews = function(articles) {
    var info, msg;
    info = _.assign(getBaseInfo(this.req.data), {
      Articles: articles
    });
    msg = compiled['news'](info);
    return this.reply(msg);
  };

  Handler.prototype.reply = function(msg) {
    this.res.writeHead(200);
    return this.res.end(msg);
  };

  return Handler;

})();

getBaseInfo = function(data) {
  var info;
  return info = {
    ToUserName: data.FromUserName,
    FromUserName: data.ToUserName,
    CreateTime: new Date().getTime()
  };
};

module.exports = Handler;
