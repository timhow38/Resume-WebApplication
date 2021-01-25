var iframe = document.createElement('iframe');
iframe.setAttribute("src", "https://miro.com/");
document.body.appendChild(iframe);
iframeWindow = iframe.contentWindow;
iframeWindow.console.log = function() { /* nop */ };