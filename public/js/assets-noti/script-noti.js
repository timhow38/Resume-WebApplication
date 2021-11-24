images = [
	{source: "../../img/images/noti/noti-06.png", title: 'Context Menu', text: 'Press <kbd><kbd>"Right</kbd> <kbd>Click"</kbd></kbd> to open a custom context menu!'}, 
	{source: "../../img/images/noti/noti-05.png", title: 'CLI Terminal', text: 'Explore the inbuilt terminal and take control of the site with a few key strokes!'}, 
	{source: "../../img/images/noti/noti-02.png", title: 'Draggable UI', text: 'You can drag icons and windows, try to: <br> <kbd>"Left + Click"</kbd> and drag them!'}, 
	{source: "../../img/images/noti/noti-03.png", title: 'Opening Windows', text: 'You can open and close windows 3 different ways! <br> <ul><li><kbd> Through the CLI Terminal </kbd></li><li><kbd> Using the context menu! </kbd></li><li><kbd> Opening desktop icons! </kbd></li></ul>  '}, 
	{source: "../../img/images/noti/noti-04.png", title: 'Snappable Windows', text: "Try to move two windows together, you'll be able to snap to each other!"}
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