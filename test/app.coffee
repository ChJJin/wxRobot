CONFIG = require './config'
wxRobot = require '../lib/wxRobot'

app = new wxRobot CONFIG

app.use wxRobot.cookieParser()
app.use wxRobot.session {secret: "abc", cookie: {maxAge: 60000}}
app.onText (data, handler)->
	handler.sendText "hello #{data.FromUserName}"

app.run '/', ()->
	console.log "Express server listening on port #{CONFIG.port}"
