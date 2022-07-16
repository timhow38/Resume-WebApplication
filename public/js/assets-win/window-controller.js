$(".body-sub")
    .on("contextmenu", function(e) {
        console.log("right click");
        var n = e.pageY - 0,
            o = e.pageX - 0;
        return $("#context-menu").css({ display: "block", top: n, left: o }).addClass("show1"), !1;

    })
    .on("click", function() {
        $("#context-menu").removeClass("show1").hide(), console.log();
    });


const DEFAULT_X_POS = 35,
    DEFAULT_Y_POS = 35,
    DEFAULT_WRAP_PT_X = 1e3,
    DEFAULT_WRAP_PT_Y = 900;
class Application {
    constructor(e) {
        (this.id = e.id),
        (this.name = e.name),
        (this.onOpen = e.onOpen),
        (this.onClose = e.onClose),
        (this.onMax = e.onMax),
        (this.onWind = e.onWind),
        (this.onMin = e.onMin),
        (this.appDesc = e.appDesc),
        (this.iconOpts = { name: e.iconName, pathBG: e.iconPathBG, pathSM: e.iconPathSM }),
        (this.elm = document.getElementById(this.id));
    }
}
class AppController {
    constructor() {
        (this.apps = []), (this.icons = []), (this.iconSpawn = {});
    }
    add(e) {
        const n = { name: e.iconName, path: e.iconPathBG },
            o = new Application(e),
            t = $("#dropDownMenu"),
            a = this;
        (o.elm.onmousedown = () => {
            a.apps.forEach((e) => {
                    e.elm.style.zIndex = 1;
                }),
                (o.elm.style.zIndex = 2),
                $("#context-menu").removeClass("show1").hide();
        }),
        $("#" + o.id).draggable({
                snap: ".application",
                containment: ".pages-stack",
                scroll: !1
            }),



            //o.elm create button

            (o.elm.getElementsByClassName("btn close")[0].onclick = () => {
                a.close(o.name);

            }),
            (o.elm.getElementsByClassName("btn minimize")[0].onclick = () => {
                a.min(o.name);

            }),
            (o.elm.getElementsByClassName("btn maximise")[0].onclick = () => {
                a.max(o.name);
                //add css color red
                o.elm.getElementsByClassName("btn maximise")[0].style.display = "none";
                o.elm.getElementsByClassName("btn windowed")[0].style.display = "block";

            }),
            (o.elm.getElementsByClassName("btn windowed")[0].onclick = () => {
                a.Wind(o.name);
                o.elm.getElementsByClassName("btn windowed")[0].style.display = "none";
                o.elm.getElementsByClassName("btn maximise")[0].style.display = "block";
            });





        const i = document.createElement("div");
        (i.id = "app-icon-" + o.name), i.classList.add("desk-prop");
        const p = document.createElement("div");
        p.classList.add("card"), i.appendChild(p);
        const c = document.createElement("img");
        c.classList.add("card-img-top"),
            c.classList.add("mx-auto"),
            c.classList.add("d-block"),
            (c.src = n.path),
            (c.alt = "Card image cap"),
            p.appendChild(c);
        const r = document.createElement("div");
        r.classList.add("card-body");
        const l = document.createElement("p");
        l.classList.add("card-text"),
            (l.innerText = n.name),
            r.appendChild(l),
            p.appendChild(r);
        const d = document.getElementById(e.iconParent);
        d.appendChild(i);
        var m = localStorage.getItem("iconPos");
        if (
            (m || ((m = "{}"), localStorage.setItem("iconPos", m)),
                (m = JSON.parse(m))[n.name])
        )
            (i.style.left = m[n.name].left), (i.style.top = m[n.name].top);
        else {
            this.iconSpawn[e.iconParent] || (this.iconSpawn[e.iconParent] = { x: 20, y: 50 });
            const n = this.iconSpawn[e.iconParent];
            (i.style.left = n.x + "px"),
            (i.style.top = n.y + "px"),
            (n.x += e.iconXDelta || 0),
            (n.y += e.iconYDelta || 0);
        }
        this.icons.push({ id: i.id, name: n.name }),
            (i.ondblclick = () => {
                a.open(o.name);
                a.Wind(o.name);
            }),
            $("#app-icon-" + o.name).draggable({
                containment: "#" + e.iconParent,
                scroll: !1,
                grid: [20, 20]
            }),
            this.apps.push(o);


        //If app has class tempOpen
        i.oncontextmenu = (e) => {
            e.preventDefault();
            console.log(i.id);
            console.log(o.id);

            //if app is open
            if (o.elm.style.display == "block") {
                const u = document.createElement("button");
                u.classList.add("btn", "btn-secondary"),
                    (u.innerText = "Close"),
                    (u.onclick = () => {
                        this.close(o.name);
                        document.getElementById("win-toggle").removeChild(u);
                        $("#context-menu").removeClass("show1").hide(), console.log();
                    }),
                    //add constuctor to context menu
                    document.getElementById("win-toggle").appendChild(u);
            } else if (o.elm.classList.contains("tempOpen")) {
                const u = document.createElement("button");
                u.classList.add("btn", "btn-secondary"),
                    (u.innerText = "Open - Minimized"),
                    (u.onclick = () => {
                        this.open(o.name);
                        document.getElementById("win-toggle").removeChild(u);
                        $("#context-menu").removeClass("show1").hide(), console.log();
                    }),
                    //add constuctor to context menu
                    document.getElementById("win-toggle").appendChild(u);
            } else {
                const u = document.createElement("button");
                u.classList.add("btn", "btn-secondary"),
                    (u.innerText = "Open"),
                    (u.onclick = () => {
                        this.open(o.name);
                        document.getElementById("win-toggle").removeChild(u);
                        $("#context-menu").removeClass("show1").hide(), console.log();
                    }),
                    //add constuctor to context menu
                    document.getElementById("win-toggle").appendChild(u);
            }
        };

        //right click on app window and log the name of the app
        //Fuck this code snipit inparticular :/ - Like you dont even know :'(
        o.elm.oncontextmenu = (e) => {
            e.preventDefault();
            const u = document.createElement("button");
            u.classList.add("btn", "btn-secondary"),
                (u.innerText = "Close"),
                (u.onclick = () => {
                    this.close(o.name);
                    document.getElementById("win-toggle").removeChild(u);
                    $("#context-menu").removeClass("show1").hide(), console.log();
                }),
                //add constuctor to context menu
                document.getElementById("win-toggle").appendChild(u);

        };
        //left click on app window and icon and log the name of the app


        o.elm.onclick = (e) => {
            console.group(
                "%conClick Output",
                "background-color: green ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
            );
            console.log("%cApp Name:", "color:yellow", o.name);
            console.log("%cClass Name:", "color:yellow", o.id);
            console.groupEnd();
        }
        i.onclick = (e) => {
            console.group(
                "%conClick Output",
                "background-color: green ; color: #ffffff ; font-weight: bold ; padding: 4px ;"
            );
            console.log("%cApp Name:", "color:yellow", o.name);
            console.log("%cClass Name:", "color:yellow", i.id);
            console.groupEnd();
        }



        const g = document.createElement("button");
        (g.innerText = o.name),
        g.classList.add("btn-secondary"),
            (g.onclick = () => {
                a.open(o.name);
            }),
            (g.onmouseup = () => {
                $("#context-menu").removeClass("show1").hide();
            }),
            document.getElementById("openApp").appendChild(g),
            this.close(o.name);

        const h = document.createElement("button");
        (h.innerText = o.name),
        h.classList.add("btn-secondary"),
            (h.onclick = () => {
                a.close(o.name);
            }),

            (h.onmouseup = () => {
                $("#context-menu").removeClass("show1").hide();
            }),


            document.getElementById("closeApp").appendChild(h),
            this.close(o.name);



        function btnRefresh() {
            document.getElementById("btnRefresh");
            window.location = window.location.href;
            localStorage.clear();
        }
        document.getElementById("btnRefresh").onclick = function() { btnRefresh() };
    }
    min(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            (this.apps.forEach((e) => {
                    e.elm.style.zIndex = 1;
                }),
                (n.elm.style.zIndex = 2),



                //
                //close app
                $("#" + n.id)
                .removeClass("application")
                .addClass("application-non-drag tempOpen"),
                //change .minWindow-" + n.name css to display:block
                $("#task-windows").find(".minWindow-" + n.name).css("background-color", "#34698c"),
                $("#task-windows").find(".minWindow-" + n.name).css("color", "#fff"),



                $("#" + n.id).hide(),
                n.onMin()) :
            console.log("");
    }
    open(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            (this.apps.forEach((e) => {
                    e.elm.style.zIndex = 1;
                }),
                (n.elm.style.zIndex = 2),
                $("#" + n.id)
                .removeClass("application-non-drag opc")
                .addClass("application"),
                AppStatus(),
                $("#" + n.id).show(),
                $("#" + n.id).removeClass("tempOpen"),
                $("#task-windows").find(".minWindow." + n.name).remove(),
                //If button exists dont replace and if not replace
                //$("#task-windows").append('<li class="nav-item minWindow ' + n.name + '" id="taskbar-item"><button type="button" class="btn btn-outline-primary minWindow-' + n.name + '"><img src="/img/icons/desktop/big/Chip_Green.png"/>' + n.name + '</button></li>');
                //append the apps icon image to a button
                console.log(n),
                console.log($("#task-windows").append('<li class="nav-item minWindow ' + n.name + '" id="taskbar-item"><button type="button" class="btn btn-outline-primary minWindow-' + n.name + '"><img src="' + n.iconOpts.pathSM + '"/>' + n.name + '</button></li>')),
                //if class minWindow is clicked, open the app

                $("#task-windows").find(".minWindow-" + n.name).click(function() {
                    // if app has class tempOpen apply css
                    if ($("#" + n.id).hasClass("tempOpen")) {
                        console.log("Opened");
                        $(this).css("background-color", "#00ff00");
                        appController.open($(this).text());
                    } else {
                        console.log("Minimized");
                        $(this).css("background-color", "transparent");
                        $(this).css("color", "#f76b1c");
                        appController.min($(this).text());
                    }
                    //change css of .minWindow-" + n.name to background-color: #00ff00;

                }),
                n.onOpen()) :
            console.log("Unknown app %s", e);
    }
    close(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            ($("#" + n.id)
                .removeClass("application maxOn tempOpen")
                .addClass("application-non-drag maxOff"),
                AppStatus(),
                $("#" + n.id).hide(),
                $("#" + n.id).unload(console.log("Unloaded")),
                //unload element

                //remove "task-windows" button from taskbar if app id equals to the app name closed
                //Bullcrap "." in the middle of the line - Why tho?
                $("#task-windows").find(".minWindow." + n.name).remove(),
                n.onClose()) :
            console.log("Unknown app %s", e);
    }
    max(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            (this.apps.forEach((e) => {
                    e.elm.style.zIndex = 1;
                }),
                (n.elm.style.zIndex = 2),
                $("#" + n.id)
                .removeClass("maxOff")
                .addClass("maxOn"),
                n.onMax()) :
            console.log("");
    }
    Wind(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            (this.apps.forEach((e) => {
                    e.elm.style.zIndex = 1;
                }),
                (n.elm.style.zIndex = 2),
                $("#" + n.id)
                .removeClass("maxOn")
                .addClass("maxOff"),
                n.onWind()) :
            console.log("");
    }

    saveIcons() {
        var e = {};
        this.icons.forEach((n) => {
                var o = document.getElementById(n.id);
                e[n.name] = { left: o.style.left, top: o.style.top };
            }),
            localStorage.setItem("iconPos", JSON.stringify(e));
    }
    getAppDesc(e) {
        const n = this.apps.find((n) => n.name == e);
        return n ? n.appDesc : 'Unknown application "' + e + '"';
    }
    listApps() {
        return this.apps.map((e) => e.name).join(", ");
    }
}



var appController = new AppController();

function initAppController() {
    appController.add({
            id: "draggable-JS-terminal",
            name: "terminal",
            onOpen: () => {},
            onClose: () => {
                out = "Type 'help' for more information.";
            },
            onMax: () => {},
            onMin: () => {},
            onWind: () => {},
            iconPathBG: "/img/icons/desktop/bg/Chip_Green.png",
            iconPathSM: "img/icons/desktop/sm/Chip_Green.png",
            iconName: "Terminal",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Interactable Command Line Interface. </strong>"
        }),
        appController.add({
            id: "draggable-js-projects",
            name: "projects",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            onWind: () => {},
            iconPathBG: "/img/icons/desktop/bg/Notes_Purple.png",
            iconPathSM: "/img/icons/desktop/sm/Notes_Purple.png",
            iconName: "Projects",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Current Projects. </strong>"
        }),
        appController.add({
            id: "draggable-js-adobexd",
            name: "Adobe XD Prototypes",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            onWind: () => {},
            iconPathBG: "/img/icons/desktop/bg/Desktop_Folder_2.png",
            iconPathSM: "/img/icons/desktop/sm/Desktop_Folder_2.png",
            iconName: "Adobe XD",
            iconParent: "sub-folder-0",
            iconXDelta: 95,
            appDesc: "Description: <strong> UI Prototypes </strong>"
        }),
        appController.add({
            id: "draggable-js-career",
            name: "career",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            onWind: () => {},
            iconPathBG: "/img/icons/desktop/bg/Handbag_LightBlue.png",
            iconPathSM: "/img/icons/desktop/sm/Handbag_LightBlue.png",
            iconName: "Career",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Career Links. </strong>"
        }),
        appController.add({
            id: "draggable-js-repos",
            name: "repos",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onWind: () => {},
            iconPathBG: "/img/icons/desktop/bg/Hammer_Yellow.png",
            iconPathSM: "/img/icons/desktop/sm/Hammer_Yellow.png",
            iconName: "Repos",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Github Repositories. </strong>"
        }),
        appController.add({
            id: "draggable-js-intern",
            name: "intern",
            onOpen: () => {},
            onClose: () => {},
            onMin: () => {},
            iconPathBG: "/img/icons/desktop/bg/Desktop_Folder_2.png",
            iconPathSM: "/img/icons/desktop/sm/Desktop_Folder_2.png",
            iconName: "Design Factory",
            iconParent: "sub-folder-0",
            iconXDelta: 95,
            appDesc: "Description: <strong> Design Factory Internship. </strong>"
        }),
        appController.add({
            id: "draggable-js-isan",
            name: "isan",
            onOpen: () => {},
            onClose: () => {},
            onMin: () => {},
            iconPathBG: "/img/icons/desktop/bg/Desktop_Folder_2.png",
            iconPathSM: "/img/icons/desktop/sm/Desktop_Folder_2.png",
            iconName: "ISAN Starmap",
            iconXDelta: 95,
            iconParent: "sub-folder-0",
            appDesc: "Description: <strong> 3JS Starmap for the game Starbase. </strong>"
        }),
        appController.add({
            id: "draggable-js-collective",
            name: "collective",
            onOpen: () => {},
            onClose: () => {},
            onMin: () => {},
            iconPathBG: "/img/icons/desktop/bg/Desktop_Folder_2.png",
            iconPathSM: "/img/icons/desktop/sm/Desktop_Folder_2.png",
            iconName: "C-SB Inactive",
            iconXDelta: 95,
            iconParent: "sub-folder-0",
            appDesc: "Description: <strong> Collective Starbase Community Website. </strong> -Inactive"
        }),
        appController.open("corecli");
}

function saveIcons() {
    appController.saveIcons();
}
$(document).ready(initAppController), setInterval(saveIcons, 1e3);

console.log(appController.apps);
console.log(appController.icons);
//on page load open the terminal
$(document).ready(function() {
    appController.open("terminal");
}   
);