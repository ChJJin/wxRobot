module.exports = "<xml>" +
"<ToUserName><![CDATA[<%-ToUserName%>]]></ToUserName>" +
"<FromUserName><![CDATA[<%-FromUserName%>]]></FromUserName>" +
"<CreateTime><%=CreateTime%></CreateTime>" +
"<MsgType><![CDATA[news]]></MsgType>" +
"<ArticleCount><%=Articles.length%></ArticleCount>" +
"<Articles>" +
"<% Articles.forEach(function(item){ %>" +
	"<item>" +
		"<Title><![CDATA[<%-item.title%>]]></Title>" +
		"<Description><![CDATA[<%-item.description%>]]></Description>" +
		"<PicUrl><![CDATA[<%-item.picUrl || item.picurl || item.pic %>]]></PicUrl>" +
		"<Url><![CDATA[<%-item.url%>]]></Url>" +
	"</item>" +
"<% }); %>" +
"</Articles>" +
"</xml>";
