var Session,
  __slice = [].slice;

Session = require('../Session');

module.exports = function() {
  return function(req, res, next) {
    var data, id, store, _end;
    if (req.sessionStore) {
      store = req.sessionStore;
      data = req.wxData;
      id = "" + data.FromUserName + "-" + data.ToUserName;
      _end = res._end;
      res.end = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if ((_ref = req.wxSession) != null) {
          _ref.save();
        }
        return _end.apply(res, args);
      };
      return store.get(id, function(err, session) {
        session = session != null ? session : req.session;
        return req.wxSession = new Session(id, req, session);
      });
    }
  };
};
