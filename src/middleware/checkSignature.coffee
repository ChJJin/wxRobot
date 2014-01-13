sha1 = require 'sha1'

module.exports = (token)->
	(req, res, next)->
		checkArray = [req.query.timestamp, req.query.nonce, token]
		checkArray.sort()

		str = sha1 checkArray.join ""

		if req.query.signature is str
			res.send 200, req.query.echostr
		else 
			res.send 200, "failed"