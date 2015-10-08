$(document).on("ready", function(){
	$drpBtn = $("div#right").find("button#loginbutton");
		$drpBtn.on("click", function(e){
			e.stopPropagation();
			$(this).parent().find("#login").fadeToggle(200);
  		});
		$("html").click(function(e){
			if( !$(e.target).closest("#login").length ) {
				$("#login").hide(200);
			}
		});
});