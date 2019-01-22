'talks'.d("! (.msg:# Entry@+ Ties@-)case; ! grecaptcha:script")

//.NS("https://dap.js.org/stuff/talks.js")

.DICT({
	base	:'https://dapmx.org/samples/helloforum/helloforum.php?',
	redir	:'https://dapmx.org/samples/helloforum/?',
	grecaptcha : 'https://www.google.com/recaptcha/api.js?render=6LddyYcUAAAAAPjIc5NfDuqasxeEijxrFGGZbPoC',

	Entry	:'msg'.d("$!!=; * (base@ `read.msg .msg)uri:query"
			,'body'.d("! .body")
			,'reply'.d("$?="
				,'action'.d("? $?:!; ! dict.reply").ui("$?=$?:!")
				,'input'.d("? $?; $author= $head= $body="
					,'message'.d(""
						,'author contenteditable'.d("!! dict.author@label").ui("$author=#:value")
						,'H3.head contenteditable'.d("!! dict.head@label").ui("$head=#:value")
						,'body contenteditable'.d("!! dict.body@label").ui("$body=#:text")
					).u("?")
					,'button.send'.d("!! dict.send@label").ui("? ($author $head $body)! (dict.incomplete)alert; ? .g-recaptcha-response=:grc (dict.badcaptcha)alert; ? $!!=( (base@ `write.msg .msg@tie)uri $author $head $body .g-recaptcha-response)post:query (dict.error)alert")
				).u("$?=")
			).u("?")
			,'ties'.d("$!!; ! Ties")
		),
		
	Ties	:'ties'.d("* (base@ `read.ties .msg)uri:query"
			,'tie'.d("$?="
				,'H3.head'.d("! .head").ui("$?=$?:!")
				,'author'.d("! .author")
				,'date'.d("! .date")
				,'A.msg target="_blank"'.d("! .msg; !! (redir .msg)uri@href")
				,'open'.d("? $?; ! Entry")
			)
		),
		
	dict	:{
		reply	:"Reply to this",
		author	:"Your name",
		head	:"Message head",
		body	:"Message body",
		send	:"Send",
		
		incomplete: "Please, fill in all fields:\nyour name, message head and message body",
		badcaptcha: "Google reCAPTCHA thinks you're bot, sorry",
		error	: "Server communication error"
		}
})

.FUNC({
	convert	:{
		grc: ()=>{
			const	async	= dap.Async(),
				sitekey	= '6LddyYcUAAAAAPjIc5NfDuqasxeEijxrFGGZbPoC';
			if(!async)return;
			grecaptcha.execute(sitekey,{action:'sendmessage'}).then(token=>async.resolve(token));
			return "grecaptcha execute";
		}
	}
})

.RENDER();