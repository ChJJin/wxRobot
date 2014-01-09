xml2js = require 'xml2js'
_ = require 'lodash'

isEmpty = (obj)->
	(_.isObject obj) and obj? and _.keys(obj).length is 0

formatMessage = (data)->
	ret = {}
	for key of data
		value = data[key][0]
		ret[key] = (if isEmpty value then '' else value).trim()
	ret

module.exports = ()->
	(req, res, next)->
		buf = ''
		req.setEncoding 'utf8'

		req.on 'data', (chunk)-> buf += chunk
		req.on 'end', ()->
			xml2js.parseString buf, {trim: true}, (err, json)->
				if err
					err.status = 400
					return next err

				req.data = formatMessage json.xml
				next()