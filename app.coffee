CONFIG = require './config'
wxRobot = require './wxRobot/wxRobot'

myRobot = new wxRobot CONFIG

myRobot.onText (data, handler)->
	handler.sendText "hello #{data.FromUserName}"

myRobot.run ()->
	console.log "Express server listening on port #{CONFIG.port}"
