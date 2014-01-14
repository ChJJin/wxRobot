class Session
	constructor: (id, req, data = {})->
		Object.defineProperty @, 'id', { value: id }
		Object.defineProperty @, 'req', { value: req }
		@[key] = data[key] for key of data

	save: (fn)->
		@req.sessionStore.set @id, @, (fn || ()->)

	destroy: (fn)->
		delete @req.wxSession
		@req.sessionStore.destroy @id, fn


module.exports = Session