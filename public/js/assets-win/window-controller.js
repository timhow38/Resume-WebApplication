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
      this.iconSpawn[e.iconParent] ||
        (this.iconSpawn[e.iconParent] = { x: 20, y: 35 });
      const n = this.iconSpawn[e.iconParent];
      (i.style.left = n.x + "px"),
        (i.style.top = n.y + "px"),
        (n.x += e.iconXDelta || 0),
        (n.y += e.iconYDelta || 0);
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
        }
        document.getElementById("btnRefresh").onclick = function() {btnRefresh()};
  }
  open(e) {
    const n = this.apps.find((n) => n.name == e);
    n
      ? (this.apps.forEach((e) => {
          e.elm.style.zIndex = 1;
        }),
        (n.elm.style.zIndex = 2),
        $("#" + n.id)
          .removeClass("application-non-drag")
          .addClass("application"),
        $("#" + n.id).show(),
        n.onOpen())
      : console.log("Unknown app %s", e);
  }
  close(e) {
    const n = this.apps.find((n) => n.name == e);
    n
      ? ($("#" + n.id)
          .removeClass("application")
          .addClass("application-non-drag"),
        $("#" + n.id).hide(),
        n.onClose())
      : console.log("Unknown app %s", e);
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
 /* appController.add({
    id: "draggable-JS-MediaApp",
    name: "MEDIAPLAYER",
    onOpen: () => {},
    onClose: () => {},
    iconPath: "/img/images/vector-img/desktop/fontAwesome/turntable.svg",
    iconName: "Media",
    iconParent: "containment-wrapper",
    iconYDelta: 100,
    appDesc: "<strong>Description:</strong> Media Player Prototype"
  }),*/
    appController.add({
      id: "draggable-JS-01",
      name: "TERMINAL",
      onOpen: () => {},
      onClose: () => {
        out = "Type 'help' for more information.";
      },
      iconPath: "/img/images/vector-img/desktop/fontAwesome/laptop-code.svg",
      iconName: "Terminal",
      iconParent: "containment-wrapper",
      iconYDelta: 100,
      appDesc:
        "<strong>Description:</strong> Interactable Command Line Interface."
    }),
    appController.add({
      id: "draggable-JS-02",
      name: "PROJECTS",
      onOpen: () => {},
      onClose: () => {},
      iconPath: "/img/images/vector-img/desktop/fontAwesome/chart-network.svg",
      iconName: "Projects",
      iconParent: "containment-wrapper",
      iconYDelta: 100,
      appDesc: "<strong>Description:</strong> Current Projects"
    }),
    appController.add({
      id: "draggable-JS-CAREER",
      name: "CAREER",
      onOpen: () => {},
      onClose: () => {},
      iconPath: "/img/images/vector-img/desktop/fontAwesome/file-alt.svg",
      iconName: "Career",
      iconParent: "containment-wrapper",
      iconYDelta: 100,
      appDesc: "<strong>Description:</strong> Career Links"
    }),
    appController.add({
      id: "draggable-JS-INTERN",
      name: "INTERN",
      onOpen: () => {},
      onClose: () => {},
      iconPath: "/img/images/vector-img/desktop/fontAwesome/folder.svg",
      iconName: "Design Factory",
      iconParent: "sub-folder-0",
      iconXDelta: 75,
      appDesc: "<strong>Description:</strong> Design Factory Internship"
    }),
    appController.add({
      id: "draggable-JS-ISAN",
      name: "ISAN",
      onOpen: () => {},
      onClose: () => {},
      iconPath: "/img/images/vector-img/desktop/fontAwesome/folder.svg",
      iconName: "ISAN Starmap",
      iconXDelta: 75,
      iconParent: "sub-folder-0",
      appDesc: "<strong>Description:</strong> 3JS Starmap for the game Starbase"
    }),
    appController.add({
      id: "draggable-JS-REPOS",
      name: "REPOS",
      onOpen: () => {},
      onClose: () => {},
      iconPath: "/img/images/vector-img/desktop/fontAwesome/github-square.svg",
      iconName: "Repos",
      iconParent: "containment-wrapper",
      iconYDelta: 100,
      appDesc: "<strong>Description:</strong> Github Repositories"
    }),
    appController.open("corecli");
}
function saveIcons() {
  appController.saveIcons();
}
$(document).ready(initAppController), setInterval(saveIcons, 1e3);
