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
	
	
	var s3Options = {
			dropdownHeight	: "200px",
			imageLocation	: "right",
			padding			: 8,
			select			: 0,
			width			: 300
	};
	
	$("#s3").gorillaDropdown(s3Options);
	
	
	
	
	var s4Options = {
			arrowDown		: "",
			arrowUp			: "",
			dropdownHeight	: "200px",
			imageLocation	: "right",
			padding			: 8,
			select			: 0,
//			textFontWeight	: "normal",
			width			: 260
	};
	
	$("#s4").gorillaDropdown(s4Options);
	
	$("#s4").gorillaDropdown("select", {"index": 4});
//	$("#s4").gorillaDropdown("select", {"value": "Reds"});
	
	
	$('#get-selected').on('click', function () {
		var selected = $("#s2").gorillaDropdown("selected");
		console.log(selected);
	});
	
	
});

