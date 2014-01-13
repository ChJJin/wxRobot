var sha1;

sha1 = require('sha1');

module.exports = function(token) {
  return function(req, res, next) {
    var checkArray, str;
    checkArray = [req.query.timestamp, req.query.nonce, token];
    checkArray.sort();
    str = sha1(checkArray.join(""));
    if (req.query.signature === str) {
      return res.send(200, req.query.echostr);
    } else {
      return res.send(200, "failed");
    }
  };
};
