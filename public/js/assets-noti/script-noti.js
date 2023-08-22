images = [
	{source: "../../img/images/noti/noti-06.png", title: 'Context Menu', text: 'Press <strong>"Right Click"</strong> to open a custom context menu!'},
	{source: "../../img/images/noti/noti-07.png", title: 'Under Construction', text: 'This site is always under construction, if you have any questions, please drop a message <strong><a target="blank_" href="https://github.com/timhow38/Resume-WebApplication/issues"><u>Github Issues</u></a></strong>.'}, 
	{source: "../../img/images/noti/noti-05.png", title: 'CLI Terminal', text: 'Explore the inbuilt terminal and take control of the site with a few key strokes!'},
	{source: "../../img/images/noti/noti-02.png", title: 'Draggable UI', text: 'You can drag icons and windows, try to: <br> <strong>"Left + Click"</strong> and drag them!'}, 
	{source: "../../img/images/noti/noti-03.png", title: 'Opening Windows', text: 'You can open and close windows 3 different ways! <br> <ul><li><strong> Through the CLI Terminal </strong></li><li><strong> Using the context menu! </strong></li><li><strong> Opening desktop icons! </strong></li></ul>  '}, 
	{source: "../../img/images/noti/noti-04.png", title: 'Snappable Windows', text: "Try to move two windows together, you'll be able to snap them to each other!"}
]

var usedImages = [];

var pickImage = function(){
   var numberOfImages = images.length; 
	var num = getNum();  
	console.log(num);
	
	if (usedImages.indexOf(num) === -1) {
		document.getElementById("image").src = images[num].source;
		document.getElementById("noti-title").innerHTML = images[num].title;
		document.getElementById("noti-text").innerHTML = images[num].text;
		usedImages.push(num);
	}
	else {
		if (usedImages.length === numberOfImages) {
			usedImages = [];
		}
		pickImage();
	}
};

var getNum = function() {
  var length = images.length - 1;
  return Math.round(Math.random()* length);
}