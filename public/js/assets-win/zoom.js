var zoom = 1;
		
		$('.zoom').on('click', function(){
			zoom += 0.1;
			$('.body-sub').css('zoom', zoom);
		});
		$('.zoom-init').on('click', function(){
			zoom = 1;
			$('.body-sub').css('zoom', zoom);
		});
		$('.zoom-out').on('click', function(){
			zoom -= 0.1;
			$('.body-sub').css('zoom', zoom);
		});


/*
function zoomIn()
{
  var Page = document.getElementById('Body');
  var zoom = parseInt(Page.style.zoom) + 10 +'%'
  Page.style.zoom = zoom;
  return false;
}

function zoomOut()
{
  var Page = document.getElementById('Body');
  var zoom = parseInt(Page.style.zoom) - 10 +'%'
  Page.style.zoom = zoom;
  return false;
}

function zoomset()
{
  var Page = document.getElementById('Body');
  var zoom = parseInt(Page.style.zoom) = 10 +'%'
  Page.style.zoom = zoom;
  return false;
}

document.getElementByClass("zoom").onclick = function() {zoomIn()};

document.getElementByClass("zoom-out").onclick = function() {zoomOut()};

document.getElementByClass("zoom-init").onclick = function() {(zoomset)};



$('.win-prop .header').click(function() {
  $('#draggable-JS-01').css({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: -webkit-fill-available,
      height: -webkit-fill-available
  
  });
});
function goFullScreen(){

  var elem = document.getElementById(temp);

  if(elem.requestFullscreen){
      elem.requestFullscreen();
  }
  else if(elem.mozRequestFullScreen){
      elem.mozRequestFullScreen();
  }
  else if(elem.webkitRequestFullscreen){
      elem.webkitRequestFullscreen();
  }
  else if(elem.msRequestFullscreen){
      elem.msRequestFullscreen();
  }
}

function exitFullScreen(){

  if(document.exitFullscreen){
      document.exitFullscreen();
  }
  else if(document.mozCancelFullScreen){
      document.mozCancelFullScreen();
  }
  else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
  }
  else if(document.msExitFullscreen){
      document.msExitFullscreen();
  }

}

function myFunction() {
  var x = document.getElementById("draggable-JS-01");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}*/