CONFIG = require './config'
wxRobot = require './wxRobot/wxRobot'

myRobot = new wxRobot CONFIG

myRobot.onText (data, handler)->
	console.log data
	console.log JSON.stringify process.env
	handler.sendText JSON.stringify process.env

myRobot.run ()->
	console.log "Express server listening on port #{CONFIG.port}"
