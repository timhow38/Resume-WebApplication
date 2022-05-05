$(".body-sub")
    .on("contextmenu", function(e) {

        console.log("right click");
        //removeSettings();
        var n = e.pageY - 0,
            o = e.pageX - 0;
        return $("#context-menu").css({ display: "block", top: n, left: o }).addClass("show1"), !1;

    })
    .on("click", function() {
        $("#context-menu").removeClass("show1").hide(), console.log();

    });

//create function called removeSettings
//Fuck this cause me some strife- remember that is ruins appendChild
//function removeSettings() {
//    //if id "win-close" exists then remove it
//    if ($("#win-close").length) {
//        $("#win-close").remove();
//    } else {
//        //else do nothing
//    }
//}


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
        (this.appDesc = e.appDesc),
        (this.iconOpts = { name: e.iconName, path: e.iconPath }),
        (this.elm = document.getElementById(this.id));
    }
}
class AppController {
    constructor() {
        (this.apps = []), (this.icons = []), (this.iconSpawn = {});
    }
    add(e) {
        const n = { name: e.iconName, path: e.iconPath },
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
                a.close(o.name);

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



        i.oncontextmenu = (e) => {
            e.preventDefault();
            console.log(i.id);
            console.log(o.id);
            //appcontroller.open(o.name);
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

        };

        //right click on app window and log the name of the app
        //Fuck this code snipit inparticular :/ - Like you dont even know :'(
        o.elm.oncontextmenu = (e) => {
            e.preventDefault();
            console.log(o.name);
            console.log(o.id);
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
    open(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            (this.apps.forEach((e) => {
                    e.elm.style.zIndex = 1;
                }),
                (n.elm.style.zIndex = 2),
                $("#" + n.id)
                .removeClass("application-non-drag")
                .addClass("application"),
                AppStatus(),
                $("#" + n.id).show(),
                n.onOpen()) :
            console.log("Unknown app %s", e);
    }
    close(e) {
        const n = this.apps.find((n) => n.name == e);
        n
            ?
            ($("#" + n.id)
                .removeClass("application maxOn")
                .addClass("application-non-drag maxOff"),
                AppStatus(),
                $("#" + n.id).hide(),
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
            onWind: () => {},
            iconPath: "/img/icons/desktop/big/Chip_Green.png",
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
            onWind: () => {},
            iconPath: "/img/icons/desktop/big/Notes_Purple.png",
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
            onWind: () => {},
            iconPath: "/img/icons/desktop/big/Desktop_Folder_2.png",
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
            onWind: () => {},
            iconPath: "/img/icons/desktop/big/Handbag_LightBlue.png",
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
            iconPath: "/img/icons/desktop/big/Hammer_Yellow.png",
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
            iconPath: "/img/icons/desktop/big/Desktop_Folder_2.png",
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
            iconPath: "/img/icons/desktop/big/Desktop_Folder_2.png",
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
            iconPath: "/img/icons/desktop/big/Desktop_Folder_2.png",
            iconName: "C-SB Inactive",
            iconXDelta: 95,
            iconParent: "sub-folder-0",
            appDesc: "Description: <strong> Collective Starbase Community Website. </strong> -Inactive"
        }),
        appController.add({
            id: "draggable-js-temp",
            name: "temp",
            onOpen: () => {},
            onClose: () => {},
            iconPath: "/img/icons/desktop/big/Desktop_Folder_2.png",
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

//on right click alert user
//$(document).ready(function() {
//    $(document).on("contextmenu", function(e) {
//        e.preventDefault();
//        document.getElementById("win-close").removeChild(u);
//    });
//});



//console.log(appController.apps);
//console.log(appController.icons);