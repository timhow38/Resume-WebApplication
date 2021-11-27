function showTime() {
    let e = moment().format("h:mm:ss a");
    (document.getElementById("MyClockDisplay").innerHTML = e),
        setInterval(() => {
            (e = moment().format("h:mm:ss a")), (document.getElementById("MyClockDisplay").innerHTML = e);
        }, 1e3);
}
setInterval(showTime, 1e3),
    $(".body-sub")
        .on("contextmenu", function (e) {
            var n = e.pageY - 0,
                o = e.pageX - 0;
            return $("#context-menu").css({ display: "block", top: n, left: o }).addClass("show1"), !1;
        })
        .on("click", function () {
            $("#context-menu").removeClass("show1").hide(), console.log();
        });
