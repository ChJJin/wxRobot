express = require 'express'
http = require 'http'
sugar = require 'sugar'
Handler = require './Handler'
checkSignature = require './middleware/checkSignature'
xml2js = require './middleware/xml2js'

msgTypes = ['text', 'image', 'voice', 'video', 'location', 'link']

class wxRobot
	constructor: (@option = {port: 3000})->
		@_cb = {}
		msgTypes.each (type)=>
			@["on#{type.capitalize()}"] = (cb)=>
				@_cb[type] = cb

	run: (cb = ()->)->
		app = express()
		app.get '/', express.bodyParser(), checkSignature(@option.TOKEN)
		app.post '/', xml2js(), (req, res, next)=>
			dataType = req.data.MsgType
			handler = new Handler req, res
			@_cb[dataType]? req.data, handler

		http.createServer(app).listen @option.port, cb

module.exports = wxRobot