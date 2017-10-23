$(function() {
	
	
	
	$("#s1").gorillaDropdown();
	
	
	var s2Options = {
//			backgroundColor: "green",
//			borderColor: "orange",
//			hoverColor: "lime",
//			borderWidth: 10,
			
//			dropdownArrowDown: "&#x2193;",
//			dropdownArrowUp: "&#x2191;",
//			placeholderText: "blah",
//			padding: 25,
			width: 500
	};
	
	$("#s2").gorillaDropdown(s2Options);
	
	
//	$("select").gorillaDropdown();
	
	
	
	
	
	
	
	$('#get-selected').on('click', function () {
		var selected = $("#s2").gorillaDropdown("selected");
		console.log(selected);
	});
	
	
});

