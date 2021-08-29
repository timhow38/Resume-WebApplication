let cliView;
!(function () {
    var t = {
            init: function () {
                r.$document.ready(this.onDomReady), r.$body.on("keyup", this.onKeyUp).on("keydown", this.onKeyDown).on("keypress", this.onKeyPress), this.initPrompt(), r.$window.on("scroll touchmove mousewheel", this.onScroll);
            },
            onDomReady: function () {
                r.initCursor();
            },
            initPrompt: function () {
                r.$prompt.on("ctrlChar", this.onCtrlChar).on("command", this.onCommand).on("async", this.onAsync);
            },
            onCommand: function (t, o) {
                t.preventDefault(), r.outputCommandResult(i.executeCommand(o));
            },
            onAsync: function (t, o) {
                t.preventDefault(), r.outputCommandResult(i.getFeedArticles(o));
            },
            onCtrlChar: function (t, i) {
                switch ((t.preventDefault(), i.toLowerCase())) {
                    case "backspace":
                        r.deleteChar();
                        break;
                    case "delete":
                        r.moveCursorForward(), r.deleteChar();
                        break;
                    case "arrowleft":
                        r.moveCursorBack();
                        break;
                    case "arrowright":
                        r.moveCursorForward();
                        break;
                    case "arrowup":
                        r.promptHistory(!0);
                        break;
                    case "arrowdown":
                        r.promptHistory(!1);
                        break;
                    case "end":
                        r.removeCursor(), r.moveCursor(r.$prompt.text().length);
                        break;
                    case "home":
                        r.moveCursor(0);
                        break;
                    case "pagedown":
                        r.scrollPage(1);
                        break;
                    case "pageup":
                        r.scrollPage(-1);
                        break;
                    case "enter":
                        r.enterCommandLine();
                }
            },
            onKeyUp: function (t) {
                t.preventDefault();
            },
            onKeyDown: async function (t) {
                if ((t.preventDefault(), t.ctrlKey && "v" == t.key)) {
                    (await navigator.clipboard.readText()).split("").forEach((t) => r.typeChar(t));
                } else r.typeChar(t.key);
            },
            onKeyPress: function (t) {
                t.preventDefault();
            },
            onScroll: function (t) {
                !0 === r.isScrolling && (t.preventDefault(), t.stopPropagation());
            },
        },
        r = {
            init: function () {
                (this.$document = $(document)),
                    (this.$window = $(window)),
                    (this.$scroll = $("html, body")),
                    (this.$body = $("body")),
                    (this.$terminal = $("#terminal")),
                    0 === this.$terminal.length && (this.$body.append('<div id="terminal"></div>'), (this.$terminal = $("#terminal"))),
                    this.initTerminal();
            },
            initTerminal: function () {
                (this.$cli = $("#cli")), 0 === this.$cli.length && this.clearTerminal(), (this.$prompt = $("#cli .prompt")), (this.$history = !1), (this.curPos = 0), (this.isScrolling = !1), (this.scrollSpeed = 1e3);
            },
            clearTerminal: function () {
                this.$terminal.html('<div class="print"></div><div id="cli"><span class="label"></span><span class="prompt"></span></div>'), this.initTerminal(), t.initPrompt();
            },
            typeChar: function (t) {
                var r = i.triggerCtrlCodes(t);
                if ("" != r) {
                    this.removeCursor();
                    var o = this.$prompt.html(),
                        s = this.curPos == o.length ? this.getCursor() : this.getCursor(o.substring(this.curPos, this.curPos + 1)) + o.substring(this.curPos + 1);
                    this.$prompt.html(o.substring(0, this.curPos) + r + s), (this.curPos = this.curPos + 1);
                }
            },
            deleteChar: function () {
                if (this.curPos > 0) {
                    this.removeCursor();
                    var t = this.$prompt.html();
                    this.$prompt.html(t.substring(0, this.curPos - 1) + t.substring(this.curPos)), (this.curPos = this.curPos - 1), this.setCursor();
                }
            },
            moveCursorBack: function () {
                this.curPos > 0 && (this.removeCursor(), (this.curPos = this.curPos - 1), this.setCursor());
            },
            moveCursorForward: function () {
                this.removeCursor(), this.curPos < this.$prompt.text().length && (this.curPos = this.curPos + 1), this.setCursor();
            },
            moveCursor: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                (this.curPos = t), this.setCursor();
            },
            initCursor: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "&nbsp;";
                this.removeCursor(), (this.curPos = 0), (this.$history = !1), this.$prompt.html(this.getCursor(t));
            },
            setCursor: function () {
                if (this.curPos >= 0) {
                    this.removeCursor();
                    var t = this.$prompt.html();
                    this.$prompt.html(t.substring(0, this.curPos) + (this.curPos == t.length ? this.getCursor() : this.getCursor(t.substring(this.curPos, this.curPos + 1))) + t.substring(this.curPos + 1));
                } else 0 === p.length && this.initCursor();
            },
            getCursor: function () {
                return '<span class="cursor">' + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "&nbsp;") + "</span>";
            },
            removeCursor: function () {
                var t = this.$prompt.children(".cursor");
                "&nbsp;" == t.html() ? t.remove() : this.$prompt.html(this.$prompt.text());
            },
            printTerminal: function (t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "command";
                this.$cli.prev().append('<div class="' + r + '">' + t + "</div>"), this.$terminal.scrollTop(this.$terminal[0].scrollHeight);
            },
            enterCommandLine: function () {
                var t = $.trim(this.$prompt.text());
                this.printTerminal(t, "command label"), i.triggerCommand(t), this.initCursor();
            },
            outputCommandResult: function (t) {
                this.printTerminal(t, "command output");
            },
            promptHistory: function () {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if (
                    (!1 === this.$history
                        ? (this.$history = t ? $("#terminal .print .command.label").last() : $("#terminal .print .command.label").first())
                        : (this.$history = t ? this.$history.prevAll(".command.label").first() : this.$history.nextAll(".command.label").first()),
                    this.$history.length)
                ) {
                    var r = this.$history.text();
                    this.$prompt.html(r), this.moveCursor(r.length);
                } else this.initCursor();
            },
            scrollPage: function (t) {
                var i = this;
                if (!1 === this.isScrolling) {
                    (this.isScrolling = !0), (t = $.isNumeric(t) && 1 === Math.abs(t) ? t : 1);
                    var o = this.$document.height(),
                        s = this.$window.height(),
                        e = this.$window.scrollTop() + s * t,
                        n = e < 0 ? 0 : e + s > o ? o - s : e;
                    r.$scroll.animate({ scrollTop: n }, e !== n ? Math.floor(this.scrollSpeed / 6.6666) : this.scrollSpeed, function () {
                        i.isScrolling = !1;
                    }),
                        console.log("'scrolling' (" + this.isScrolling + ") speed: " + this.scrollSpeed + "; " + e);
                }
            },
        };
    cliView = r;
    var i = {
        triggerCtrlCodes: function (t) {
            var i = "";
            return t.length > 1 ? r.$prompt.trigger("ctrlChar", [t]) : (i = t), i;
        },
        triggerCommand: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            r.$prompt.trigger("command", this.getCommand(t));
        },
        executeCommand: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return commandHandler.run(t) || "";
        },
        getCommand: function () {
            var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split(" ");
            return {
                command: t.shift().toLowerCase(),
                arguments: t.filter(function (t) {
                    return t.length > 0;
                }),
            };
        },
        getFeedArticles: function (t) {
            var r = this,
                i = "";
            try {
                $.isArray(t.query.results.item)
                    ? $.each(t.query.results.item, function (t, o) {
                          i = i + '<a href="' + o.link + '" title="' + r.encodeHtmlEntity(o.description) + '">' + o.title + "</a><br>";
                      })
                    : (i = "Error: No feed articles found.");
            } catch (t) {
                i = "Error: Invalid feed. Please use a valid url.<br><i>(" + t + ")</i>";
            }
            return i;
        },
        getFeedYQL: function (t) {
            var i = "https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22" + encodeURI(t) + "%3Fformat%3Dxml%22&format=json&diagnostics=true&callback=";
            $.getJSON(
                i,
                function (t) {
                    r.$prompt.trigger("async", t);
                },
                "jsonp"
            );
        },
        decodeHtmlEntity: function (t) {
            return t.replace(/&#(\d+);/g, function (t, r) {
                return String.fromCharCode(r);
            });
        },
        encodeHtmlEntity: function (t) {
            for (var r = [], i = t.length - 1; i >= 0; i--) r.unshift(["&#", t[i].charCodeAt(), ";"].join(""));
            return r.join("");
        },
    };
    r.init(), t.init();
})();
