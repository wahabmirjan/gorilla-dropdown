(function ($) {
	
	$.fn.gorillaDropdown = function(options) {
		
		
		/*
		
		By default, this plugin will convert the following structure
		
		<select id="s2" class="some-class">
			<option value="saab" data-imgsrc="http://url/to/saab/logo" data-description="Description about Saab">Saab</option>
			<option value="mercedes" data-imgsrc="http://url/to/mercedes/logo" data-description="Description about Mercedes">Mercedes</option>
		</select>
		
		
		
		Into the following (note this does not include css styling):
		
		<div id="s2" class="some-class gorilla-dropdown">
			
			<div class="container">
			
				<div class="current">
					<div>Select</div>
					<span class="arrow">&#x25bc</span>
				</div>
				
				<ul class="ddlist">
					
					<li class="dditem">
						<div>
							<img src="http://url/to/saab/logo">
						</div>
						
						<div>
							<div>Saab</div>
							<div>Description about Saab</div>
						</div>
						
						<input value="saab" type="hidden">
						<div class="-clear-both"></div>
					</li>
					
					<li class="dditem">
						<div>
							<img src="http://url/to/mercedes/logo">
						</div>
						<div>
							<div>Mercedes</div>
							<div>Description about Toyota</div>
						</div>
						<input value="mercedes" type="hidden">
						<div class="-clear-both"></div>
					</li>
					
				</ul>
			</div>
		</div>
		
		*/
		
		
		
		// Setting default settings and extending user options if there are any
		var settings = $.extend({
			
			// These are the defaults:
			arrowColor				: "#808080",
			arrowDown				: "&#x25bc;",
			arrowSize				: 14,
			arrowUp					: "&#x25b2;",
			backgroundColor			: "#ffffff",
			borderColor				: "#c0c0c0",
			borderWidth				: 1,
			hoverColor				: "#f0f8ff",
			padding					: 10,
			placeholder				: "Select",
			placeholderFontColor	: "#808080",
			placeholderFontFamily	: "Verdana",
			placeholderFontSize		: 14,
			placeholderFontStyle	: "italic",
			placeholderFontWeight	: "bold",
			width					: 300
			
		}, options);
		
		
		
		// This is the name of the CSS namespace, so we do not have CSS naming conflicts
		var dropdownNamespace = "gorilla-dropdown";
		var dropdownClassSelector = "." + dropdownNamespace;
		
		
		if (this.is("select")) {
			
			return this.each(function() {
				
				// REFORMAT HTML ELEMENT STRUCTURE
				
				// Create a new div element that will wrap everything
				var divWrapper = $("<div>");
				
				
				// Set the attributes of the "divWraper" element from the "select" element
				// ... note that "select" element is the "this" element
				$.each(this.attributes, function(i, attrib) {
					$(divWrapper).attr(attrib.name, attrib.value);
				});
				
				
				$(divWrapper).addClass(dropdownNamespace);
				
				
				
				var divContainer = $("<div>", {
					class: "container",
					css: {
						"width": settings.width + "px"
					}
				});
				
				
				// Append divContainer to divWrapper
				$(divWrapper).append(divContainer);
				
				
				// Create a div element with class "current"
				var divCurrent = $("<div>",{
					class: "current",
					css: {
						"background-color"	: settings.backgroundColor,
						"border-color"		: settings.borderColor,
						"border-width"		: settings.borderWidth + "px",
						"padding"			: settings.padding + "px"
					}
				});
				
				
				
				var divPlaceholder = $("<div>", {
					class: "content",
					text: settings.placeholder,
					css: {
						"color"			: settings.placeholderFontColor,
						"font-family"	: settings.placeholderFontFamily,
						"font-size"		: settings.placeholderFontSize,
						"font-style"	: settings.placeholderFontStyle,
						"font-weight"	: settings.placeholderFontWeight,
					}
				});
				
				$(divCurrent).append(divPlaceholder);
				
				
				
				
				// Creating and append the "arrow" span, with initial "down" arrow
				var spanArrow = $("<span>", {
					class: "arrow",
					css : {
						"color"		: settings.arrowColor,
						"font-size"	: settings.arrowSize + "px",
						"position"	: "absolute",
						"right"		: settings.borderWidth + settings.padding + "px",
						"top"		: settings.borderWidth + settings.padding + "px"
					}
				});
				
				// Down arrow text is entered via the .html() method rather than the "text" property at span creation ...
				// ... because if we do it as a property via class creation, then we only get the text displayed, not the html entity equivallent
				$(spanArrow).html(settings.arrowDown);
				
				$(divCurrent).append(spanArrow);
				
				
				// Append divContainer to divWrapper
				$(divContainer).append(divCurrent);
				
				
				
				// Create a  new "ul" element
				var ul = $("<ul>", {
					class: "ddlist"
				});
				
				
				
				// Get the "option" elements inside the "select" element
				$(this).find('option').each(function () {
					
					// Create an "li" elmenet
					var li = $("<li>", {
						class: "dditem",
						css: {
							"background-color"	: settings.backgroundColor,
							"border-color"		: settings.borderColor,
							"border-width"		: settings.borderWidth + "px",
							"padding"			: settings.padding + "px"
						}
					});
					
					// Get and set an image element
					var imgsrc = $(this).data("imgsrc");
					
					if (imgsrc != undefined) {
						
						var side1 = $("<div>", {
							css: {
								"float"			: "left",
								"margin-right"	: (settings.padding / 2) + "px"
							}
						});
						
						var img = $("<img>", {
							src: imgsrc
						});
						
						
						$(side1).append(img);
						$(li).append(side1);
						
						
						$(this).removeAttr("data-imgsrc");
						
					}
					
					
					var ddText = $(this).html().trim();
					var description = $(this).data("description");
					
					if ((ddText != "") || (description != undefined)) {
						
						var side2 = $("<div>", {
							css: {
								"float"			: "left",
								"margin-left"	: (settings.padding / 2) + "px",
							}
						});
						
						
						if (ddText != "") {
							
							var divText = $("<div>", {
								text: ddText
							});
							
							$(side2).append(divText);
						}
						
						
						if (description != undefined) {
							
							var divDescription = $("<div>", {
								text: description
							});
							
							$(side2).append(divDescription);
							
							
							$(this).removeAttr("data-description");
						}
						
						
						$(li).append(side2);
					}
					
					
					
					
					// set the attributes of the "li" element from the "option" element
					// ... note that "option" element is the "this" element"
					$.each(this.attributes, function(i, attrib) {
												
						if (attrib.name == "value") {
							
							var inputVal = $("<input>", {
								value: attrib.value,
								type: "hidden"
							});
							
							$(li).append(inputVal);
							
							$(this).removeAttr(attrib.name);
						}
						
						else {
							
							$(li).attr(attrib.name, attrib.value);
						}
						
					});
					
					
					
					
					
					
					// Append the clear div
					var divClear = $("<div>", {
						class: "-clear-both"
					});
					
					$(li).append(divClear);
					
					
					
					
					// Append the newly created "li" element to the "ul" element
					$(ul).append(li);
					
				});
				
				
				
				// Append ul to divContainer
				$(divContainer).append(ul);
				
				
				// Replace the select element and its children with the newly created li element
				$(this).replaceWith(divWrapper);
				
				
				
				
				
				// EVENTS
				
				// Clicking on the menu item container to open it
				$(divWrapper).find(".current").click(function () {
					
					// Toggle the element selected
					$(this).closest(dropdownClassSelector).find(".ddlist").toggle();
					
					
					// Toggle the arrow between "down" and "up"
					// Some details/ideas:
					// https://stackoverflow.com/questions/1147359/how-to-decode-html-entities-using-jquery
					// https://stackoverflow.com/questions/14482492/how-to-toggle-data-attribute-with-jquery
					
					var arrowToCompare = $('<div/>').html(settings.arrowDown).text();
					var arrowToDisplay = $(this).closest(dropdownClassSelector).find(".current .arrow").html() == arrowToCompare ? settings.arrowUp : settings.arrowDown;
					$(this).closest(dropdownClassSelector).find(".current .arrow").html(arrowToDisplay);
					
					
					
					// Get the index of the current element in relation to all other similar dropdown elements
					var index = $(dropdownClassSelector).index( $(this).closest(dropdownClassSelector) );
					
					
					// Set a data object with the current index and pass it to session storage
					var sessionStorageData = {
							indexOfLastDropdownClicked: index
					};
					
					sessionStorage.setItem(dropdownNamespace, JSON.stringify(sessionStorageData));
					
					
					
					 
					// Set up an event listener so that clicking anywhere outside the dropdown, or clicking on another dropdown will close our dropdown menu
					// Details: https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element?page=3#8603563
					$(document).click(sessionStorageData, function(event) {
						
						
						// Retrieve the value of the last clicked object from session storage
				        var dataFromSessionStorage = $.parseJSON(sessionStorage.getItem(dropdownNamespace));
						
						
						// check up the tree of the click target to check whether user has clicked outside of menu, of another dropdown menu was clicked
						if (($(event.target).closest(dropdownClassSelector).length==0) || 
							(dataFromSessionStorage.indexOfLastDropdownClicked != event.data.indexOfLastDropdownClicked)) {
							
							// Set the arrow to the down position
							$(dropdownClassSelector).eq(event.data.indexOfLastDropdownClicked).find(".current .arrow").html(settings.arrowDown);
							
							// Hide the dropdown menu
							// Details: https://stackoverflow.com/questions/46779305/retrieving-the-id-guid-for-a-dom-element/46779437
							$(dropdownClassSelector).eq(event.data.indexOfLastDropdownClicked).find(".ddlist").hide();
							
							
							// This event listener has done its job so we can unbind it.
							$(this).unbind(event);
						}
						
						
					}); // End of: $(document).click(sessionStorageData, function(event) {
					
				}); // End of: $(divWrapper).find(".current").click(function () {
				
				
				
				// Selecting an item from the dropdown list
				$(divWrapper).find(".dditem").click(function () {
					
					// Get the HTML of the selected item to the current item
					$(this).closest(dropdownClassSelector).find(".current .content").remove();
					
					var newCurrentDiv = $("<div>", {
						class: "content"
					});
					
					$(newCurrentDiv).append($(this).html());
					
					$(this).closest(dropdownClassSelector).find(".current").append(newCurrentDiv);
					
					
					
					// Set the arrow to the down position
					$(this).closest(dropdownClassSelector).find(".current .arrow").html(settings.arrowDown);
					
					
					// Hide the drop down
					$(this).closest(dropdownClassSelector).find(".ddlist").hide();
					
					
					// Set the item as "selected" in the drop down, and remove the "selected" class from all other siblings (so only one item is selected)
					$(this).addClass("-pseudo-selected").css("background-color", settings.hoverColor).siblings().removeClass("-pseudo-selected").css("background-color", settings.backgroundColor);
					
				});
				
				
				
				// Hover over items;
				$(divWrapper).find(".dditem").hover(function () {
					$(this).css("background-color", settings.hoverColor);
				}, function () {
					if (!$(this).hasClass("-pseudo-selected")){
						$(this).css("background-color", settings.backgroundColor);
					}
					
				});
				
				
			}); // End of: return this.each(function()
		
		} // End of: if (this.is("select"))
		
	}; // End of: $.fn.gorillaDropdown = function()

} (jQuery));
