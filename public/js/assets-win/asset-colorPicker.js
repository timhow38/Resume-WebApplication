let colorPicker = document.getElementById("colorPicker");
let box = document.getElementById("context-menu");
let output = document.getElementById("output");

box.style.backgroundColor = colorPicker.value;

colorPicker.addEventListener("input", function(event) {
  box.style.backgroundColor = event.target.value;
}, false);

colorPicker.addEventListener("change", function(event) {
  output.innerText = "Color set to " + colorPicker.value + ".";
}, false);