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
        (this.onMin = e.onMin),
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
            (o.elm.getElementsByClassName("btn close")[0].onclick = () => {
                a.close(o.name);
            }),
            (o.elm.getElementsByClassName("btn maximise")[0].onclick = () => {
                a.max(o.name);
                getElementById('btn maximise').style.display = 'none';
                getElementById('btn minimize').style.display = 'block';
            }),
            (o.elm.getElementsByClassName("btn minimize")[0].onclick = () => {
                a.min(o.name);
                getElementById('btn minimize').style.display = 'none';
                getElementById('btn maximise').style.display = 'block';
            });
        var s = document.createElement("button");
        (s.id = "app-button-" + o.name),
        s.classList.add("dropdown-item"),
            (s.type = "button"),
            (s.innerText = o.name.toUpperCase()),
            (s.onclick = () => {
                a.open(o.name);
            }),
            t.append(s);

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
            (n.y += e.iconYDelta || 0),
            //if icon is out of bounds move it down and to the right
            n.x > DEFAULT_WRAP_PT_X && (n.x = 20),
                n.y > DEFAULT_WRAP_PT_Y && (n.y = 50);

        }
        this.icons.push({ id: i.id, name: n.name }),
            (i.ondblclick = () => {
                a.open(o.name);
            }),
            $("#app-icon-" + o.name).draggable({
                containment: "#" + e.iconParent,
                scroll: !1,
                grid: [20, 20]
            }),
            this.apps.push(o);

        //App List Open
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
    min(e) {
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
                n.onMin()) :
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
            iconPath: "/img/icons/desktop/big/Chip_Green.png",
            iconName: "Terminal",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Interactable Command Line Interface. </strong>"
        }),
        appController.add({
            id: "draggable-JS-projects",
            name: "projects",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            iconPath: "/img/icons/desktop/big/Notes_Purple.png",
            iconName: "Projects",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Current Projects. </strong>"
        }),
        appController.add({
            id: "draggable-JS-ADOBEXD",
            name: "Adobe XD Prototypes",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            iconPath: "/img/icons/desktop/big/Desktop_Folder_2.png",
            iconName: "Adobe XD",
            iconParent: "sub-folder-0",
            iconXDelta: 95,
            appDesc: "Description: <strong> UI Prototypes </strong>"
        }),
        appController.add({
            id: "draggable-JS-CAREER",
            name: "career",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            iconPath: "/img/icons/desktop/big/Handbag_LightBlue.png",
            iconName: "Career",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Career Links. </strong>"
        }),
        appController.add({
            id: "draggable-JS-REPOS",
            name: "repos",
            onOpen: () => {},
            onClose: () => {},
            onMax: () => {},
            onMin: () => {},
            iconPath: "/img/icons/desktop/big/Hammer_Yellow.png",
            iconName: "Repos",
            iconParent: "containment-wrapper",
            iconYDelta: 100,
            appDesc: "Description: <strong> Github Repositories. </strong>"
        }),
        appController.add({
            id: "draggable-JS-INTERN",
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
            id: "draggable-JS-ISAN",
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
            id: "draggable-JS-COLLECTIVE",
            name: "collective",
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