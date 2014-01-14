Session = require '../Session'

module.exports = ()->
	(req, res, next)-> if req.sessionStore
		store = req.sessionStore
		data = req.wxData
		id = "#{data.FromUserName}-#{data.ToUserName}"

		_end = res._end
		res.end = (args...)->
			req.wxSession?.save()
			_end.apply res, args

		store.get id, (err, session)->
			session = session ? req.session
			req.wxSession = new Session id, req, session
