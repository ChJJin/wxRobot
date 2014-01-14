var formatMessage, isEmpty, xml2js, _;

xml2js = require('xml2js');

_ = require('lodash');

isEmpty = function(obj) {
  return (_.isObject(obj)) && (obj != null) && _.keys(obj).length === 0;
};

formatMessage = function(data) {
  var key, ret, value;
  ret = {};
  for (key in data) {
    value = data[key][0];
    ret[key] = (isEmpty(value) ? '' : value).trim();
  }
  return ret;
};

module.exports = function() {
  return function(req, res, next) {
    var buf;
    buf = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
      return buf += chunk;
    });
    return req.on('end', function() {
      return xml2js.parseString(buf, {
        trim: true
      }, function(err, json) {
        if (err) {
          err.status = 400;
          return next(err);
        }
        req.wxData = formatMessage(json.xml);
        return next();
      });
    });
  };
};
