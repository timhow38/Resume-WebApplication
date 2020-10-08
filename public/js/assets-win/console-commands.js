//Copyright 2019, Timothy Howard, strikeeaglechase#0001 , All rights reserved.
const purge2 =
	"-------------------▒▒▌-------------<br>------------------▒░▒▒▌-------------<br>-----------------▒░░▒▒▒▌------------<br>----------------▒░░░▒▒▒▒▌-----------<br>---------------▒░░░░▒▒▒▒▒▌----------<br>--------------▒░░░░▒▒▒▒▒▒▒▌---------<br>-------------▒░░░░░▒▒▒▒▒▒▒▒▌--------<br>------------▒░░░░░░▒▒▒▒▒▒▒▒▒▌-------<br>-----------▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▌------<br>----------▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓-----<br>----░▒---▒▒░░░░░░░░░░░░░░░░░░░░▒----<br>-----▒▒▒▒░░░░░░░░▐▁▐█▁░▒▒▐▁▐█▁░▒---<br>------▒▒▒▒░░░░░░░░░░░░▒▙░░░░░░░▒▒--<br>-------▒▒▒▒░░░░░░░░░░░▒▀▀░░░░░░▒▒---<br>--------▒▒▒▒░░░░░◀██████████▶░░░▒--<br>---------▒▒▒░░░░░░░░░░░░░░░░░░▒▒----<br>----------▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒-----<br>-----------░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒------<br>-----------░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒-------<br>-----------▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▌-----<br>---------▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▌----<br>--------▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌---<br>--------▒█▀▀█-█░░█-█▀▀█-█▀▀▀-█▀▀▒---<br>--------▒█░░█-█░░█-█▄▄▀-█░▀█-█▀▀▒---<br>--------▒█▀▀▀-░▀▀▀-▀░▀▀-▀▀▀▀-▀▀▀▒---";

class ConsoleHandler {
	constructor(unknownCommand) {
		this.commands = [];
		this.unknownCommand = unknownCommand;
	}
	add({ name, helpMsg, extendedHelp, run, aliases }) {
		this.commands.push({
			names: [name].concat(aliases || []),
			helpMsg: helpMsg,
			run: run,
			extendedHelp: extendedHelp,
		});
	}
	run(cmd) {
		const command = this.resolve(cmd.command);
		if (!command) {
			return this.unknownCommand;
		}
		return command.run(...cmd.arguments);
	}
	resolve(txt) {
		return this.commands.find((c) => c.names.includes(txt));
	}
	getHelp() {
		var txt =
			'<table id="tablePreview" class="table table-hover table-sm"><thead><tr><th>Command - Alias</th><th>Description</th></tr></thead><tbody>';
		this.commands.forEach((command) => {
			if (command.helpMsg) {
				txt +=
					"<tr><td><b>[" +
					command.names.join("] | [") +
					"]</b></td><td>" +
					command.helpMsg +
					"</td></tr>";
			}
		});
		txt += "</tbody></table>";
		return txt;
	}
}
const commandHandler = new ConsoleHandler("Unknown Command");
commandHandler.add({
	name: "help",
	helpMsg: "Its help lmao",
	extendedHelp: "This is the help. <br> Usage: help OR help [commandName]",
	run: (cmdName) => {
		if (!cmdName) {
			return commandHandler.getHelp();
		} else {
			const cmd = commandHandler.resolve(cmdName);
			if (!cmd) {
				return 'Unknown command "' + cmdName + "'";
			}
			return (
				cmd.names[0] +
				": " +
				cmd.extendedHelp +
				"<br>Aliases: " +
				cmd.names.slice(1).join(", ")
			);
		}
	},
	aliases: ["h", "?"],
});
commandHandler.add({
	name: "clear",
	helpMsg: "Clear the console",
	extendedHelp: "Clears the console. <br> Usage: clear",
	run: function () {
		cliView.clearTerminal();
		return "Type 'help' for more information.";
	},
	aliases: ["cls","purge"],
});
commandHandler.add({
	name: "about-devs",
	helpMsg: "Gives some info on the devs",
	extendedHelp: "Gives some info on the devs. <br> Usage: about-devs",
	run: () =>
		'Made by Timothy Howard (<a href="https://codepen.io/timhow38" target="_blank">about.me</a>)<br>Copyright (c) 2018 Timothy Howard',
});
commandHandler.add({
	name: "calc",
	helpMsg: "Preforms some arithmatic",
	extendedHelp:
		"Takes in any valid regular arithmatic and returns the result. <br> Usage: calc [expr]",
	run: () => eval([...arguments].join("")),
});
commandHandler.add({
	name: "search",
	helpMsg: "Preform a google search",
	extendedHelp:
		"Redirects the page to google search. <br> Usage: search [search term]",
	run: () => {
		window.location.href = encodeURI(
			"https://www.google.com/search?q=" + [...arguments].join(" ")
		);
		return "Redirecting...";
	},
	aliases: ["google"],
});
commandHandler.add({
	name: "refresh",
	helpMsg: "Refreshes the page",
	extendedHelp: "Refreshes the page. <br> Usage: refresh",
	run: () => {
		window.location = window.location.href+'?eraseCache=true';
		return "Redirecting...";
	},
});
commandHandler.add({
	name: "goto",
	helpMsg: "Go to another webpage",
	extendedHelp: "Loads a different webpage. <br> Usage: goto [url]",
	run: (loc) => {
		window.location.href = encodeURI("" + loc);
		return "Redirecting...";
	},
	aliases: ["web"],
});
/* TODO: Make app-list dynamic*/
commandHandler.add({
	name: "app-list",
	helpMsg: "Lists all applications",
	extendedHelp: "Lists all the apps in a table. <br> Usage: app-list",
	run: () =>
		'<table id="tablePreview" class="table table-hover table-sm"> <thead> <tr> <th>App Name</th> <th>Description</th> </tr></thead> <tbody> <tr> <td>CoreCli</td><td>Terminal Interface</td></tr><tr> <td>Discord</td><td>Collective Discord</td></tr></tbody> </table><table id="tablePreview" class="table table-hover table-sm"> <thead> <tr> <th>Branch Apps</th> <th>Description</th> </tr></thead> <tbody> <tr> <td>Diplomacy</td><td>HARMONIC -Branch</td></tr><tr> <td>Tactical</td><td>SWARM -Branch</td></tr><tr> <td>Logistics</td><td>LOGISTICS -Branch</td></tr><tr> <td>Science</td><td>R&amp;D -Branch</td></tr></tbody> </table>',
});
commandHandler.add({
	name: "open",
	helpMsg: "Opens an app",
	extendedHelp: "Opens up an application. <br> Usage: open [app name]",
	run: (appName) => appController.open(appName),
	aliases: ["start"],
});
commandHandler.add({
	name: "close",
	helpMsg: "Closes an app",
	extendedHelp: "Closes up an application. <br> Usage: close [app name]",
	run: (appName) => appController.close(appName),
	aliases: ["end"],
});
commandHandler.add({
	name: "app-desc",
	helpMsg: "Get the description of an application",
	extendedHelp:
		"Gets the description of an application. <br> Usage: app-desc [app name]",
	run: (appName) => appController.getAppDesc(appName),
});
commandHandler.add({
	name: "app-list-all",
	helpMsg: "Lists all applications",
	extendedHelp: "Lists all applications. <br> Usage: app-list-all ",
	run: () => appController.listApps(),
});
commandHandler.add({
	name: "pause",
	helpMsg: "Pauses the music player",
	extendedHelp: "Pauses the music player. <br> Usage: pause ",
	run: () => Player.pause(),
	aliases: ["stop-music"],
});
commandHandler.add({
	name: "play",
	helpMsg: "Plays the music player",
	extendedHelp: "Plays the music player. <br> Usage: play ",
	run: () => Player.play(),
	aliases: ["start-music"],
});

commandHandler.add({
	name: "honk",
	helpMsg: "",
	extendedHelp: "",
	run: () =>
		'<img style="width:6em;" src="../../img/images/commands/honk.png"></img>',
});
commandHandler.add({
	name: "lazy-ps1",
	helpMsg: "Powershell Script",
	extendedHelp: "Downloads Script <br> Usage: lazy-ps1",
	run: () =>
	window.open = '../exp-software/LazyWinAdmin_GUI-master.zip',
});
/*
commandHandler.add({
	name: "purge",
	helpMsg: "",
	extendedHelp: "",
	run: () =>
		'<img style="width:2em;margin-left: -9px;transform: rotate(90deg);" src="../../img/images/commands/purge.png"></img>',
});
*/
/*
commandHandler.add({
	name: "purge2",
	helpMsg: "",
	extendedHelp: "",
	run: () => purgeTest,
});*/