express = require 'express'
http = require 'http'
_ = require 'lodash'
Handler = require './Handler'
checkSignature = require './middleware/checkSignature'
xml2js = require './middleware/xml2js'
session = require './middleware/session'

msgTypes = ['text', 'image', 'voice', 'video', 'location', 'link']

capitalize = (str)->
	str[0].toUpperCase() + str.slice 1

class wxRobot
	constructor: (@option = {port: 3000})->
		@_cb = {}
		_.forEach msgTypes, (type)=>
			@["on#{capitalize(type)}"] = (cb)=>
				@_cb[type] = cb
				@

		@app = express()
		@app.use express.query()
		@app.use xml2js()

	use: (args...)->
		@app.use.apply @app, args

	run: (path = '/', cb = ()->)->
		@app.get path, checkSignature(@option.TOKEN)
		@app.post path, session(), (req, res, next)=>
			dataType = req.wxData.MsgType
			handler = new Handler req, res
			@_cb[dataType]? req.wxData, handler

		http.createServer(@app).listen @option.port, cb

exports = module.exports = wxRobot

for key of express
	Object.defineProperty exports, key,
			Object.getOwnPropertyDescriptor(express, key)
