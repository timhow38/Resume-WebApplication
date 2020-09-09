//Copyright 2019, Timothy Howard, strikeeaglechase#0001 , All rights reserved.
let cliView;
(function app() {
	var event = {
		init: function init() {
			view.$document.ready(this.onDomReady);
			view.$body
				.on("keyup", this.onKeyUp)
				.on("keydown", this.onKeyDown)
				.on("keypress", this.onKeyPress);
			this.initPrompt();
			view.$window.on("scroll touchmove mousewheel", this.onScroll);
		},
		onDomReady: function onDomReady() {
			view.initCursor();
		},
		initPrompt: function initPrompt() {
			view.$prompt
				.on("ctrlChar", this.onCtrlChar)
				.on("command", this.onCommand)
				.on("async", this.onAsync);
		},
		onCommand: function onCommand(e, c) {
			e.preventDefault();
			view.outputCommandResult(controller.executeCommand(c));
		},
		onAsync: function onAsync(e, d) {
			e.preventDefault();
			view.outputCommandResult(controller.getFeedArticles(d));
		},
		onCtrlChar: function onCtrlChar(e, t) {
			e.preventDefault();
			//console.log(`codename: ${t}`);
			switch (t.toLowerCase()) {
				case "backspace":
					view.deleteChar();
					break;
				case "delete":
					view.moveCursorForward();
					view.deleteChar();
					break;
				case "arrowleft":
					view.moveCursorBack();
					break;
				case "arrowright":
					view.moveCursorForward();
					break;
				case "arrowup":
					view.promptHistory(true);
					break;
				case "arrowdown":
					view.promptHistory(false);
					break;
				case "end":
					view.removeCursor();
					view.moveCursor(view.$prompt.text().length);
					break;
				case "home":
					view.moveCursor(0);
					break;
				case "pagedown":
					view.scrollPage(1);
					break;
				case "pageup":
					view.scrollPage(-1);
					break;
				case "enter":
					view.enterCommandLine();
					break;
			}
		},
		onKeyUp: function onKeyUp(e) {
			e.preventDefault();
		},
		//Ctrl F5
		onKeyDown: async function onKeyDown(e) {
			e.preventDefault();
			if (e.ctrlKey && e.key == "v") {
				const clipboard = await navigator.clipboard.readText();
				clipboard.split("").forEach((char) => view.typeChar(char));
			} else {
				view.typeChar(e.key);
			}
		},
		onKeyPress: function onKeyPress(e) {
			e.preventDefault();
		},
		onScroll: function onScroll(e) {
			if (view.isScrolling === true) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
	};

	var view = {
		init: function init() {
			this.$document = $(document);
			this.$window = $(window);
			this.$scroll = $("html, body");
			this.$body = $("body");
			this.$terminal = $("#terminal");
			if (this.$terminal.length === 0) {
				this.$body.append('<div id="terminal"></div>');
				this.$terminal = $("#terminal");
			}
			this.initTerminal();
		},
		initTerminal: function initTerminal() {
			this.$cli = $("#cli");
			if (this.$cli.length === 0) {
				this.clearTerminal();
			}
			this.$prompt = $("#cli .prompt");
			this.$history = false;
			this.curPos = 0;
			this.isScrolling = false;
			this.scrollSpeed = 1000;
		},
		clearTerminal: function clearTerminal() {
			this.$terminal.html(
				'<div class="print"></div><div id="cli"><span class="label"></span><span class="prompt"></span></div>'
			);
			this.initTerminal();
			event.initPrompt();
		},
		typeChar: function typeChar(c) {
			var realChr = controller.triggerCtrlCodes(c);
			if (realChr != "") {
				this.removeCursor();
				var _p = this.$prompt.html();
				var pright =
					this.curPos == _p.length
						? this.getCursor()
						: this.getCursor(_p.substring(this.curPos, this.curPos + 1)) +
						  _p.substring(this.curPos + 1);
				this.$prompt.html(_p.substring(0, this.curPos) + realChr + pright);
				this.curPos = this.curPos + 1;
			}
		},
		deleteChar: function deleteChar() {
			if (this.curPos > 0) {
				this.removeCursor();
				var _p2 = this.$prompt.html();
				this.$prompt.html(
					_p2.substring(0, this.curPos - 1) + _p2.substring(this.curPos)
				);
				this.curPos = this.curPos - 1;
				this.setCursor();
			}
		},
		moveCursorBack: function moveCursorBack() {
			if (this.curPos > 0) {
				this.removeCursor();
				this.curPos = this.curPos - 1;
				this.setCursor();
			}
		},
		moveCursorForward: function moveCursorForward() {
			this.removeCursor();
			if (this.curPos < this.$prompt.text().length) {
				this.curPos = this.curPos + 1;
			}
			this.setCursor();
		},
		moveCursor: function moveCursor() {
			var pos =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: 0;
			this.curPos = pos;
			this.setCursor();
		},
		initCursor: function initCursor() {
			var char =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "&nbsp;";
			this.removeCursor();
			this.curPos = 0;
			this.$history = false;
			this.$prompt.html(this.getCursor(char));
		},
		setCursor: function setCursor() {
			if (this.curPos >= 0) {
				this.removeCursor();
				var _p3 = this.$prompt.html();
				this.$prompt.html(
					_p3.substring(0, this.curPos) +
						(this.curPos == _p3.length
							? this.getCursor()
							: this.getCursor(
									_p3.substring(this.curPos, this.curPos + 1)
							  )) +
						_p3.substring(this.curPos + 1)
				);
			} else {
				if (p.length === 0) {
					this.initCursor();
				}
			}
		},
		getCursor: function getCursor() {
			var char =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "&nbsp;";
			return '<span class="cursor">' + char + "</span>";
		},
		removeCursor: function removeCursor() {
			var $cur = this.$prompt.children(".cursor");
			var chr = $cur.html();
			if (chr == "&nbsp;") {
				$cur.remove();
			} else {
				this.$prompt.html(this.$prompt.text());
			}
		},
		printTerminal: function printTerminal(txt) {
			var cssClasses =
				arguments.length > 1 && arguments[1] !== undefined
					? arguments[1]
					: "command";
			this.$cli
				.prev()
				.append('<div class="' + cssClasses + '">' + txt + "</div>");
			this.$terminal.scrollTop(this.$terminal[0].scrollHeight);
		},
		enterCommandLine: function enterCommandLine() {
			var p = $.trim(this.$prompt.text());
			this.printTerminal(p, "command label");
			controller.triggerCommand(p);
			this.initCursor();
		},
		outputCommandResult: function outputCommandResult(out) {
			this.printTerminal(out, "command output");
		},
		promptHistory: function promptHistory() {
			var prev =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: true;
			if (this.$history === false) {
				this.$history = prev
					? $("#terminal .print .command.label").last()
					: $("#terminal .print .command.label").first();
			} else {
				this.$history = prev
					? this.$history.prevAll(".command.label").first()
					: this.$history.nextAll(".command.label").first();
			}
			if (this.$history.length) {
				var h = this.$history.text();
				this.$prompt.html(h);
				this.moveCursor(h.length);
			} else {
				this.initCursor();
			}
		},
		scrollPage: function scrollPage(direction) {
			var _this = this;
			if (this.isScrolling === false) {
				this.isScrolling = true;
				direction =
					$.isNumeric(direction) && Math.abs(direction) === 1
						? direction
						: 1;
				var dh = this.$document.height(),
					wh = this.$window.height(),
					offset = this.$window.scrollTop() + wh * direction,
					adjusted = offset < 0 ? 0 : offset + wh > dh ? dh - wh : offset;
				view.$scroll.animate(
					{
						scrollTop: adjusted,
					},

					offset !== adjusted
						? Math.floor(this.scrollSpeed / 6.6666)
						: this.scrollSpeed,
					function () {
						_this.isScrolling = false;
					}
				);

				console.log(
					"'scrolling' (" +
						this.isScrolling +
						") speed: " +
						this.scrollSpeed +
						"; " +
						offset
				);
			}
		},
	};
	cliView = view;

	var controller = {
		triggerCtrlCodes: function triggerCtrlCodes(codename) {
			var r = "";
			if (codename.length > 1) {
				view.$prompt.trigger("ctrlChar", [codename]);
			} else {
				r = codename;
			}
			return r;
		},
		triggerCommand: function triggerCommand() {
			var prompt =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "";
			view.$prompt.trigger("command", this.getCommand(prompt));
		},
		executeCommand: function executeCommand() {
			var cmd =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: {};
			return commandHandler.run(cmd) || "";
		},
		getCommand: function getCommand() {
			var prompt =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: "";
			var arrPrompt = prompt.split(" ");
			return {
				command: arrPrompt.shift().toLowerCase(),
				arguments: arrPrompt.filter(function (arg) {
					return arg.length > 0;
				}),
			};
		},
		getFeedArticles: function getFeedArticles(json) {
			var _this2 = this;
			var out = "";
			try {
				if ($.isArray(json.query.results.item)) {
					$.each(json.query.results.item, function (i, item) {
						out =
							out +
							'<a href="' +
							item.link +
							'" title="' +
							_this2.encodeHtmlEntity(item.description) +
							'">' +
							item.title +
							"</a><br>";
					});
				} else {
					out = "Error: No feed articles found.";
				}
			} catch (e) {
				out =
					"Error: Invalid feed. Please use a valid url.<br><i>(" +
					e +
					")</i>";
			}
			return out;
		},
		getFeedYQL: function getFeedYQL(url) {
			var yql =
				"https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22" +
				encodeURI(url) +
				"%3Fformat%3Dxml%22&format=json&diagnostics=true&callback=";
			$.getJSON(
				yql,
				function (data) {
					view.$prompt.trigger("async", data);
				},
				"jsonp"
			);
		},
		decodeHtmlEntity: function decodeHtmlEntity(str) {
			return str.replace(/&#(\d+);/g, function (match, dec) {
				return String.fromCharCode(dec);
			});
		},
		encodeHtmlEntity: function encodeHtmlEntity(str) {
			var buf = [];
			for (var i = str.length - 1; i >= 0; i--) {
				buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
			}
			return buf.join("");
		},
	};

	(function init() {
		view.init();
		event.init();
	})();
})();
