_ = require 'lodash'

msgTypes = ['text', 'image', 'voice', 'video', 'music', 'news']
compiled = {}
_.forEach msgTypes, (type)->
	compiled[type] = _.template require "./replyDataFormat/#{type}Format"

class Handler
	constructor: (@req, @res)->

	sendText: (content)->
		info = _.assign getBaseInfo(@req.data), {
			Content: content
		}
		msg = compiled['text'] info
		@reply msg

	sendImage: (mediaId)->
		info = _.assign getBaseInfo(@req.data), {
			MediaId: mediaId
		}
		msg = compiled['image'] info
		@reply msg

	sendVoice: (mediaId)->
		info = _.assign getBaseInfo(@req.data), {
			MediaId: mediaId
		}
		msg = compiled['voice'] info
		@reply msg

	sendVideo: (mediaId, title, description)->
		info = _.assign getBaseInfo(@req.data), {
			MediaId: mediaId
			Title: title
			Description: description
		}
		msg = compiled['video'] info
		@reply msg

	sendMusic: (musicUrl, HQmusicUrl, thumbMediaId, title, description)->
		info = _.assign getBaseInfo(@req.data), {
			MusicUrl: musicUrl
			HQMusicUrl: HQmusicUrl
			ThumbMediaId: thumbMediaId
			Title: title
			Description: description
		}
		msg = compiled['music'] info
		@reply msg

	sendNews: (articles)->
		info = _.assign getBaseInfo(@req.data), {
			Articles: articles
		}
		msg = compiled['news'] info
		@reply msg

	reply: (msg)->
		@res.writeHead 200
		@res.end msg

getBaseInfo = (data)->
	info = 
		ToUserName: data.FromUserName
		FromUserName: data.ToUserName
		CreateTime: new Date().getTime()

module.exports = Handler