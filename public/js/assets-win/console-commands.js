var myArray = [];


class ConsoleHandler {
    constructor(e) {
        (this.commands = []), (this.unknownCommand = e);
    }
    add({ name: e, helpMsg: a, extendedHelp: n, run: r, aliases: s }) {
        this.commands.push({ names: [e].concat(s || []), helpMsg: a, run: r, extendedHelp: n });
    }
    run(e) {
        const a = this.resolve(e.command);
        return a ? a.run(...e.arguments) : this.unknownCommand;
    }
    resolve(e) {
        return this.commands.find((a) => a.names.includes(e));
    }
    getHelp() {
        var e = '<table id="tablePreview" class="table table-hover table-sm"><thead><tr><th>Command - Alias</th><th>Description</th></tr></thead><tbody>';
        return (
            this.commands.forEach((a) => {
                a.helpMsg && (e += "<tr><td><b>[" + a.names.join("] | [") + "]</b></td><td>" + a.helpMsg + "</td></tr>");
            }),
            (e += "</tbody></table>")
        );
    }
}
const commandHandler = new ConsoleHandler('Unknown Command - Type <strong>"help"</strong> for a list of commands');
commandHandler.add({
        name: "help",
        helpMsg: "Its help lmao",
        extendedHelp: "This is the help. <br> Usage: help OR help [commandName]",
        run: (e) => {
            if (e) {
                const a = commandHandler.resolve(e);
                return a ? a.names[0] + ": " + a.extendedHelp + "<br>Aliases: " + a.names.slice(1).join(", ") : 'Unknown command "' + e + "'";
            }
            return commandHandler.getHelp();
        },
        aliases: ["h", "?"],
    }),
    commandHandler.add({
        name: "hint",
        helpMsg: "Need a hint on how to use this site?",
        extendedHelp: "Need a hint on how to use this site?",
        run: () => {
            return pickImage(), "<Strong>Success</strong>";
        },
        aliases: ["tip"],
    }),
    commandHandler.add({
        name: "clear",
        helpMsg: "Clear the console",
        extendedHelp: "Clears the console. <br> Usage: clear",
        run: function() {
            return cliView.clearTerminal(), "Type 'help' for more information.";
        },
        aliases: ["cls", "purge"],
    }),
    commandHandler.add({
        name: "open",
        helpMsg: "Opens an app",
        extendedHelp: "Opens up an application. <br> Usage: open [app name]",
        //run: (e) => appController.open(e),
        run: (e) => {
            if (e) {
                appController.open(e)
            } else {
                return 'Please specify an app to open. Type <strong>"app-list"</strong> for help';
            }
        },
        aliases: ["start", "cd"]
    }),
    commandHandler.add({
        name: "close",
        helpMsg: "Closes an app",
        extendedHelp: "Closes up an application. <br> Usage: close [app name]",
        //run: (e) => appController.close(e),
        run: (e) => {
            if (e) {
                appController.close(e)
            } else {
                return 'Please specify an app to close. Type <strong>"app-list"</strong> for help';
            }
        },
        aliases: ["end", "cd.."]
    }),
    commandHandler.add({ name: "app-list", helpMsg: "Lists all applications", extendedHelp: "Lists all applications. <br> Usage: app-list-all ", run: () => appController.listApps() }),
    commandHandler.add({ name: "app-desc", helpMsg: "Get the description of an application", extendedHelp: "Gets the description of an application. <br> Usage: app-desc [app name]", run: (e) => appController.getAppDesc(e) }),
    commandHandler.add({
        name: "about",
        helpMsg: "Gives some info on the devs",
        extendedHelp: "Gives some info on the dev. <br> Usage: about",
        run: () =>
            'Lead Developer: <a href="https://github.com/timhow38" target="_blank">Timothy Howard</a><br>JS Scriptor: <a href="https://github.com/Strikeeaglechase" target="_blank">Strikeeaglechase</a><br><br><strong>Copyright &copy; 2018 Timothy Howard</strong>',
    }),
    commandHandler.add({ name: "calc", helpMsg: "Preforms some arithmatic", extendedHelp: "Takes in any valid regular arithmatic and returns the result. <br> Usage: calc [expr]", run: () => eval([...arguments].join("")) }),

    commandHandler.add({ name: "refresh", helpMsg: "Refreshes the page", extendedHelp: "Refreshes the page. <br> Usage: refresh", run: () => ((window.location = window.location.href), localStorage.clear()) }),
    commandHandler.add({ name: "goto", helpMsg: "Go to another webpage", extendedHelp: "Loads a different webpage. <br> Usage: goto [url]", run: (e) => ((window.location.href = encodeURI("" + e)), "Redirecting..."), aliases: ["web"] }),
    commandHandler.add({ name: "honk", helpMsg: "", extendedHelp: "", run: () => '<img style="width:6em;" src="../../img/images/commands/honk.png"></img>' });
commandHandler.add({ name: "deez", helpMsg: "", extendedHelp: "", run: () => '<img style="width:6em;" src="../../img/images/commands/deez.png"></img>' });


// create command to search stackoverflow opening in a new tab
commandHandler.add({
    name: "stackoverflow",
    helpMsg: "Search StackOverflow",
    extendedHelp: "Search StackOverflow. <br> Usage: stackoverflow [query]",
    run: (e) => {
        if (e) {
            return (window.open("https://stackoverflow.com/search?q=" + e), "Searching...");
        } else {
            return 'Please specify a query. Type <strong>"help"</strong> for help';
        }
    },
    aliases: ["stk", "stack"]
});
/*commandHandler.add({
        name: "search",
        helpMsg: "Preform a google search",
        extendedHelp: "Redirects the page to google search. <br> Usage: search [search term]",
        run: () => (
            (window.location.href = encodeURI("https://www.google.com/search?q=" + [...arguments].join(" "))), "Redirecting..."),
        aliases: ["google"],
    })*/


$(function() {

    $("*").each(function() {
        var oneArray = [];
        var tag = $(this).prop("tagName");
        var classname = $(this).attr("class") ? $(this).attr("class") : "N/A";
        var background = $(this).css("background-color");
        var color = $(this).css("color");

        //if border value is empty, set to N/A
        var border = $(this).css("border-color");
        if (border == "") {
            border = "N/A";
        }

        oneArray["tag"] = tag;
        oneArray["classname"] = classname;
        oneArray["background"] = background;
        oneArray["color"] = color;
        oneArray["border"] = border;

        //convert oneArray "color" to hex
        //var hex = oneArray["background"];
        //var hex = hex.replace(/rgb\(/, '').replace(/\)/, '').replace(/ /g, '').split(',');
        //var hex = "#" + ((1 << 24) + (parseInt(hex[0]) << 16) + (parseInt(hex[1]) << 8) + parseInt(hex[2])).toString(16).slice(1);
        //oneArray["background"] = hex;



        //if oneArray has duplicate tags, remove them
        if (myArray.length > 0) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i]["classname"] == oneArray["classname"]) {
                    myArray.splice(i, 1);
                }
            }
        }

        //sort myArray by tag
        myArray.sort(function(a, b) {
            var tagA = a.tag.toLowerCase(),
                tagB = b.tag.toLowerCase();
            if (tagA < tagB) //sort string ascending
                return -1;
            if (tagA > tagB)
                return 1;
            return 0; //default return value (no sorting)
        });

        //



        myArray.push(oneArray);
    });

    //console.log(myArray);
});



//create a new command that displays a table pulling from an array called myArray
commandHandler.add({
        name: "hex-table",
        helpMsg: "Displays a table",
        extendedHelp: "Displays a table. <br> Usage: table",
        run: () => {
            var table = '<table id="tablePreview" class="table table-hover table-sm"><thead><tr><th>Tag</th><th>Class</th><th>Background</th><th>Color</th><th>Border</th></tr></thead><tbody>';
            for (var i = 0; i < myArray.length; i++) {
                table += "<tr>";
                for (var key in myArray[i]) {
                    table += "<td>" + myArray[i][key] + "</td>";
                }
                table += "</tr>";
            }
            table += "</table>";
            return table;
        },
        aliases: ["hex", "color"]
    }),

    commandHandler.add({
        name: "debug",
        helpMsg: "Opens the debug console",
        extendedHelp: "Opens the debug console. <br> Usage: debug",
        //run: (e) => appController.open(e),
        run: (e) => {
            if (e == "true") {

                //set #dbgHide to display:none
                $("#dbgHide").css("display", "none");
                //add css property "padding-left: 10px;" to id "debugDiv"
                $("#debugDiv").css("padding-left", "10px");

                console.log = function(message) {
                    //if message contains the text "open" or "closed" wrap it in <strong> tags
                    if (message.includes("open") || message.includes("closed")) {
                        message = "<strong>" + message + "</strong>";
                    } else {
                        message = message;
                    }

                    $('#debugDiv').append('<p>' + message + '</p>');
                };
                console.error = console.debug = console.info = console.log;


            } else if (e == "false") {
                $("#debugDiv").remove();
                //add css property "padding-left: 10px;" to id "debugDiv"
                $("#debugDiv").css("padding-left", "0px");
                $("#dbgHide").css("display", "block");

            } else {
                return "Please specify <strong>\"true\"</strong> or <strong>\"false\"</strong>";
            }
        },
        aliases: ["dbg"]
    });