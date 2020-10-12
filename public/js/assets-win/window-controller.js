//Copyright 2019, Timothy Howard, All rights reserved.
const DEFAULT_X_POS = 20;
const DEFAULT_Y_POS = 35;
const DEFAULT_WRAP_PT_X = 1000;
const DEFAULT_WRAP_PT_Y = 900;
class Application {
	constructor(opts) {
		this.id = opts.id;
		this.name = opts.name;
		this.onOpen = opts.onOpen;
		this.onClose = opts.onClose;
		this.appDesc = opts.appDesc;
		this.iconOpts = {
			name: opts.iconName,
			path: opts.iconPath,
		};
		this.elm = document.getElementById(this.id);
	}
}
class AppController {
	constructor() {
		this.apps = [];
		this.icons = [];
		this.iconSpawn = {};
	}
	add(opts) {
		const iconOpts = {
			name: opts.iconName,
			path: opts.iconPath,
		};
		const app = new Application(opts);
		const dropDown = $("#dropDownMenu");
		const self = this;
		//Setup bring to front on click
		app.elm.onmousedown = () => {
			self.apps.forEach((otherApp) => {
				otherApp.elm.style.zIndex = 1;
			});
			app.elm.style.zIndex = 2;
			$("#context-menu").removeClass("show1").hide();
		};
		//Make app draggable
		$("#" + app.id).draggable({
			snap: ".application",
			containment: ".pages-stack",
			scroll: false,
		});
		//Make app closable
		const closeButton = app.elm.getElementsByClassName("btn close")[0];
		closeButton.onclick = () => {
			self.close(app.name);
		};

		const minimButton = app.elm.getElementsByClassName("btn minus")[0];
		minimButton.onclick = () => {
			self.close(app.name);
		};

		//Create top right drop down element
		var btn = document.createElement("button");
		btn.id = "app-button-" + app.name;
		btn.classList.add("dropdown-item");
		btn.type = "button";
		btn.innerText = app.name.toUpperCase();
		btn.onclick = () => {
			self.open(app.name);
		};

		dropDown.append(btn);
		//Create desktop icon
		const container = document.createElement("div");
		container.id = "app-icon-" + app.name;
		container.classList.add("desk-prop");
		const cardContainer = document.createElement("div");
		cardContainer.classList.add("card");
		container.appendChild(cardContainer);
		const img = document.createElement("img");
		img.classList.add("card-img-top");
		img.classList.add("mx-auto");
		img.classList.add("d-block");
		img.src = iconOpts.path;
		img.alt = "Card image cap";
		cardContainer.appendChild(img);
		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");
		const cardText = document.createElement("p");
		cardText.classList.add("card-text");
		cardText.innerText = iconOpts.name;
		cardBody.appendChild(cardText);
		cardContainer.appendChild(cardBody);
		const parentElm = document.getElementById(opts.iconParent);
		if (!parentElm) {
			debugger;
		}
		parentElm.appendChild(container);

		//Figure out positioning
		var savedPos = localStorage.getItem("iconPos");
		if (!savedPos) {
			savedPos = "{}";
			localStorage.setItem("iconPos", savedPos);
		}
		savedPos = JSON.parse(savedPos);
		if (savedPos[iconOpts.name]) {
			container.style.left = savedPos[iconOpts.name].left;
			container.style.top = savedPos[iconOpts.name].top;
		} else {
			if (!this.iconSpawn[opts.iconParent]) {
				this.iconSpawn[opts.iconParent] = {
					x: 20,
					y: 35,
				};
			}
			const currentPos = this.iconSpawn[opts.iconParent];
			container.style.left = currentPos.x + "px";
			container.style.top = currentPos.y + "px";
			currentPos.x += opts.iconXDelta || 0;
			currentPos.y += opts.iconYDelta || 0;
		}
		this.icons.push({
			id: container.id,
			name: iconOpts.name,
		});
		//onclick can be used
		container.ondblclick = () => {
			self.open(app.name);
		};
		$("#app-icon-" + app.name).draggable({
			containment: "#" + opts.iconParent,
			scroll: false,
			grid: [20, 20],
		});
		this.apps.push(app);
		const dropDownBtn = document.createElement("button");
		dropDownBtn.innerText = app.name;
		dropDownBtn.classList.add("dropdown-item");
		dropDownBtn.onclick = () => {
			self.open(app.name);
		};
		dropDownBtn.onmouseup = () => {
			$("#context-menu").removeClass("show1").hide();
		};
		document.getElementById("dropDownMenu2").appendChild(dropDownBtn);
		this.close(app.name);
	}
	open(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		if (!app) {
			console.log("Unknown app %s", appName);
			return;
		}
		this.apps.forEach((otherApp) => {
			otherApp.elm.style.zIndex = 1;
		});
		app.elm.style.zIndex = 2;
		$("#" + app.id)
			.removeClass("application-non-drag")
			.addClass("application");
		$("#" + app.id).show();
		app.onOpen();
	}
	close(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		if (!app) {
			console.log("Unknown app %s", appName);
			return;
		}
		$("#" + app.id)
			.removeClass("application")
			.addClass("application-non-drag");
		$("#" + app.id).hide();
		app.onClose();
	}
	saveIcons() {
		var toSave = {};
		this.icons.forEach((icon) => {
			var elm = document.getElementById(icon.id);
			toSave[icon.name] = {
				left: elm.style.left,
				top: elm.style.top,
			};
		});
		localStorage.setItem("iconPos", JSON.stringify(toSave));
	}
	getAppDesc(appName) {
		const app = this.apps.find((ap) => ap.name == appName);
		if (!app) {
			return 'Unknown application "' + appName + '"';
		}
		return app.appDesc;
	}
	listApps() {
		return this.apps.map((app) => app.name).join(", ");
	}
}
var appController = new AppController();

$(document).ready(initAppController);

function initAppController() {
	appController.add({
		id: "draggable-JS-MediaApp",
		name: "MEDIAPLAYER",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/turntable.svg",
		iconName: "MEDIAPLAYER",
		iconParent: "containment-wrapper",
		iconYDelta: 100,
		appDesc: "<strong>Description:</strong> Media Player Prototype",
	});
	//Command line app
	appController.add({
		id: "draggable-JS-01",
		name: "TERMINAL",
		onOpen: () => {},
		onClose: () => {
			// view.clearTerminal();
			out = "Type 'help' for more information.";
		},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/laptop-code.svg",
		iconName: "TERMINAL",
		iconParent: "containment-wrapper",
		iconYDelta: 100,
		appDesc: "<strong>Description:</strong> Interactable Command Line Interface.",
	});
	appController.add({
		id: "draggable-JS-02",
		name: "PROJECTS",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/chart-network.svg",
		iconName: "PROJECTS",
		iconParent: "containment-wrapper",
		iconYDelta: 100,
		appDesc: "<strong>Description:</strong> Current Projects",
	});
	appController.add({
		id: "draggable-JS-CAREER",
		name: "CAREER",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/file-alt.svg",
		iconName: "CAREER",
		iconParent: "containment-wrapper",
		iconYDelta: 100,
		appDesc: "<strong>Description:</strong> Career Links",
	});
	appController.add({
		id: "draggable-JS-INTERN",
		name: "INTERN",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/folder.svg",
		iconName: "DESIGN FACTORY",
		iconParent: "sub-folder-0",
		iconXDelta: 75,
		appDesc: "<strong>Description:</strong> Design Factory Internship",
	});
	appController.add({
		id: "draggable-JS-PIRONGIA",
		name: "PIRONGIA",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/folder.svg",
		iconName: "HERITAGE APP",
		iconXDelta: 75,
		iconParent: "sub-folder-0",
		appDesc: "<strong>Description:</strong> Pirongia Heritage Project",
	});
	appController.add({
		id: "draggable-JS-GIGXD",
		name: "GIGXD",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/folder.svg",
		iconName: "GIG ADOBE XD",
		iconXDelta: 75,
		iconParent: "sub-folder-0",
		appDesc: "<strong>Description:</strong> GIG Internship UI Tutoring",
	});
	appController.add({
		id: "draggable-JS-REPOS",
		name: "REPOS",
		onOpen: () => {},
		onClose: () => {},
		iconPath: "/img/images/vector-img/desktop/fontAwesome/github-square.svg",
		iconName: "REPOS",
		iconParent: "containment-wrapper",
		iconYDelta: 100,
		appDesc: "<strong>Description:</strong> Github Repositories",
	});

	appController.open("corecli");
}

function saveIcons() {
	appController.saveIcons();
}

setInterval(saveIcons, 1000);
