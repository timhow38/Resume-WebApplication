//Top clock
function showTime() {
	let time = moment().format('h:mm:ss a');
	document.getElementById('MyClockDisplay').innerHTML = time;
	
	setInterval(() => {
	  time = moment().format('h:mm:ss a');
	  document.getElementById('MyClockDisplay').innerHTML = time;
	}, 1000)
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
		console.log();
	});
