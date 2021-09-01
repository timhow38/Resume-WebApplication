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

*/