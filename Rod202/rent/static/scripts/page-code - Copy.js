// function: scrolling to the top coordinate of the object
//		obj: jquery object, move to this
//		menueHeight: integer, additional offset to object (for menu)
function scrollTo(obj, menuHeight) {
	$('html,body').animate({
        scrollTop: obj.offset().top - menuHeight}, 'slow');
}

// function: managing the highlite and visuals of the maps svg on page
//		object_id: string, id of the <object> containing the map
//		map_id: string, id of the svg entity inside the <object>
function animateMapSVG(object_id, map_id) {
	var map_object = document.getElementById(object_id);
		if ('contentDocument' in map_object) {
var map_document = map_object.contentDocument;
var map_svg = map_document.getElementById(map_id);

// hovering over rooms
$(map_svg).find(".room-frame").mouseover(function (){
	$(this).css("opacity","1");
});
$(map_svg).find(".room-frame").mouseout(function (){
	$(this).css("opacity","0");
});
$(map_svg).find(".map-stairs").mouseover(function (){
	$(this).css("opacity","1");
});
$(map_svg).find(".map-stairs").mouseout(function (){
	$(this).css("opacity","0");
});

//clicking on stairs
$(map_svg).find(".map-stairs-up").click(function (){
	$(".rooms-plan-carousel").slick('slickNext');
});
$(map_svg).find(".map-stairs-down").click(function (){
	$(".rooms-plan-carousel").slick('slickPrev');
});
		};
}

//	function: finding the needed room and applying needed style to frame and text
function fillMapSvg(floor, roomId, occupied) {
	var map_object = document.getElementById("imap"+floor);
	var map_document = map_object.contentDocument;
	var map_svg = map_document.getElementById("floor"+floor);
	var roomGroup = $(map_svg).find("#room-group-"+roomId);
	if (occupied) {
		roomGroup.find(".room-frame").css("fill","#cc3333").css("stroke","#cc3333");
		roomGroup.find(".room-status").find("tspan").text("занято");
		roomGroup.find(".room-status").css("fill","#860000");
	} else {
		roomGroup.find(".room-frame").css("fill","#33cc33").css("stroke","#33cc33");
		roomGroup.find(".room-status").find("tspan").text("свободно");
		roomGroup.find(".room-status").css("fill","#008600");
	}
}

// Start working after page loaded
$(document).ready(function() {
	// Measure screen size
	var screenWidth = $(document).width();
	var screenHeight = $(window).height();
	// Fix first page row to bottom of the menue
	var menuHight = $(".top-menu-wrapper").height();
	$(".page-wrapper").css("top", menuHight);

	// Set page rows hight to screen height
	var lineHeight = screenHeight - menuHight
	$(".screen-height").css("min-height",""+lineHeight+"px");

	// Fix to-top arrow button
	$(".back-to-top-button").css("top", menuHight + 5).css("left","10px");

	// Naviagating via menue
	// Navigating to top of the page
	$(".back-to-top-button, #navButtonPunchline").click(function() {
		$('html,body').animate({scrollTop: 0}, 'slow');
	});

	// Navigating to free offices 
	$("#navButtonFreeOffice").click(function() {
		scrollTo($(".free-rooms-row"), menuHight);
	});

	// Navigating to plan 
	$("#navButtonPlan").click(function() {
		scrollTo($(".rooms-plan-row"), menuHight);
	});

	// Navigate to contacts
	$("#navButtonContacts").click(function(){
		scrollTo($(".contacts-row"), menuHight);
	});

	// Navigate to application
	$("#navButtonApplication").click(function(){
		scrollTo($(".application-form-row"), menuHight);
	});

	// Managing floor plans carousel
	$(".rooms-plan-carousel").slick({
		arrow: false,
		dots: true,
		prevArrow: $(".rooms-plan-carousel-prev"),
		nextArrow: $(".rooms-plan-carousel-next"),
	});

	// Showing none free rooms notification
	if ($('.free-rooms-table tr').length == 1){
		$(".free-rooms-none-row").css("display","block");
	} else {
		$(".free-rooms-none-row").css("display","none");
	}

	// Choosing rooms in application
	$('.application-room-multiple-options').on("click",".application-room-multiple-option",function () {
		var roomNumber = $(this).text();
		$('.application-room-multiple-selected').append($(this).clone());
		$(this).remove();
		$('.application-room-multiple-select')
			.append($('<option>', { 'value':roomNumber })
			.text(roomNumber)
			.prop('selected', true));
	});

	$('.application-room-multiple-selected').on("click",".application-room-multiple-option",function () {
		var roomNumber = $(this).text();
		$('.application-room-multiple-options').append($(this).clone());
		$(this).remove();
		$('.application-room-multiple-select > option[value="'+roomNumber+'"').remove();
	});

	$(".application-room-multiple-options, .application-room-multiple-selected").kinetic({cursor:"pointer"});

	// Operations after all content is loaded
	$(window).on("load",function() {
		// Managing floors maps in SVG (after all page content is loaded)
		animateMapSVG("imap1","floor1");
		animateMapSVG("imap2","floor2");
		animateMapSVG("imap3","floor3");

		//testing map manage
		var map_object = document.getElementById('imap1');
		var map_document = map_object.contentDocument;
		var map_svg = map_document.getElementById("floor3");

		// $(map_svg).find(".room-frame").css("fill","#33cc33").css("stroke","#33cc33");
		// $(map_svg).find(".room-status").find("tspan").text("лалала");

		//getting the rooms data for the map
		$.ajax({
			url: "/getdata/roomsdata/",
			data: "",
			dataType: "json",
			success: function(data){
				// if data loaded - parse it and format maps
				$.each(data, function() {
					fillMapSvg(this.fields.floor, this.pk, this.fields.occupied);
				});
			}
		});
	});
});