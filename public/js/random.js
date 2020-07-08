//Top clock
function showTime() {
	var date = new Date();
	var h = date.getHours(); // 0 - 23
	var m = date.getMinutes(); // 0 - 59
	var s = date.getSeconds(); // 0 - 59
	var session = "AM";
	if (h == 0) {
		h = 12;
	}
	if (h > 12) {
		h = h - 12;
		session = "PM";
	}
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;
	var time = h + ":" + m + ":" + s + " " + session;
	document.getElementById("MyClockDisplay").innerText = time;
	document.getElementById("MyClockDisplay").textContent = time;
}
setInterval(showTime, 1000);
//Setup context menu
$(".body-sub")
	.on("contextmenu", function (e) {
		var top = e.pageY - 0;
		var left = e.pageX - 0;
		$("#context-menu")
			.css({
				display: "block",
				top: top,
				left: left,
			})
			.addClass("show1");
		return false; //blocks default Webbrowser right click menu
	})
	.on("click", function () {
		$("#context-menu").removeClass("show1").hide();
	});
