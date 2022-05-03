 $(".body-sub")
     .on("contextmenu", function(e) {
         var n = e.pageY - 0,
             o = e.pageX - 0;
         return $("#context-menu").css({ display: "block", top: n, left: o }).addClass("show1"), !1;
     })
     .on("click", function() {
         $("#context-menu").removeClass("show1").hide(), console.log();
     });