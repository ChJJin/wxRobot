var Session;

Session = (function() {
  function Session(id, req, data) {
    var key;
    if (data == null) {
      data = {};
    }
    Object.defineProperty(this, 'id', {
      value: id
    });
    Object.defineProperty(this, 'req', {
      value: req
    });
    for (key in data) {
      this[key] = data[key];
    }
  }

  Session.prototype.save = function(fn) {
    return this.req.sessionStore.set(this.id, this, fn || function() {});
  };

  Session.prototype.destroy = function(fn) {
    delete this.req.wxSession;
    return this.req.sessionStore.destroy(this.id, fn);
  };

  return Session;

})();

module.exports = Session;
