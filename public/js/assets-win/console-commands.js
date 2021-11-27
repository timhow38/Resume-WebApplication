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
const commandHandler = new ConsoleHandler("Unknown Command");
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
    run: () =>  { 
        return pickImage(), "";  
    }, 
    aliases: ["tip"],
}),
    commandHandler.add({
        name: "clear",
        helpMsg: "Clear the console",
        extendedHelp: "Clears the console. <br> Usage: clear",
        run: function () {
            return cliView.clearTerminal(), "Type 'help' for more information.";
        },
        aliases: ["cls", "purge"],
    }),
    commandHandler.add({ name: "open", helpMsg: "Opens an app", extendedHelp: "Opens up an application. <br> Usage: open [app name]", run: (e) => appController.open(e), aliases: ["start","cd"] }),
    commandHandler.add({ name: "close", helpMsg: "Closes an app", extendedHelp: "Closes up an application. <br> Usage: close [app name]", run: (e) => appController.close(e), aliases: ["end", "cd.."] }),
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


      /*commandHandler.add({
        name: "search",
        helpMsg: "Preform a google search",
        extendedHelp: "Redirects the page to google search. <br> Usage: search [search term]",
        run: () => (
            (window.location.href = encodeURI("https://www.google.com/search?q=" + [...arguments].join(" "))), "Redirecting..."),
        aliases: ["google"],
    })*/