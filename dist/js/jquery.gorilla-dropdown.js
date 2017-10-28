/**
 * gorilla-dropdown
 * Description - A jQuery plugin for custom drop-down list, allowing the display of text, images, and maybe more...
 * @version v0.3.0
 * @link https://github.com/wahabmirjan/gorilla-dropdown#readme
 * @license MIT
 */

;(function ($) {
	
	var dropdownNamespace = "gorilla-dropdown";
	
	var methods = {
			
			
			// Initialize/set the dropdown
			init: function (options) {
				
				
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
									<img class="image" src="http://url/to/image/1">
								</div>
								
								<div>
									<div class="text">Text 1</div>
									<div class="description">Description about Text 1</div>
								</div>
								
								<input class="value" value="text1" type="hidden">
								<div class="-clear-both"></div>
							</li>
							
							<li class="dditem">
								<div>
									<img class="image" src="http://url/to/image/2">
								</div>
								<div>
									<div class="text">Text 2</div>
									<div class="description">Description about Text 2</div>
								</div>
								<input class="value" value="text2" type="hidden">
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
					arrowSize				: "14px",
					arrowUp					: "&#x25b2;",
					backgroundColor			: "#ffffff",
					borderColor				: "#c0c0c0",
					borderWidth				: 1,
					descriptionFontColor	: "#000000",
					descriptionFontFamily	: "Verdana",
					descriptionFontSize		: "12px",
					descriptionFontStyle	: "normal",
					descriptionFontVariant	: "small-caps",
					descriptionFontWeight	: "normal",
					displayArrow			: "inline",
					dropdownHeight			: "auto",
					hoverColor				: "#f0f8ff",
					imageLocation			: "left",
					onSelect				: function () {},
					padding					: 10,
					placeholder				: "Select",
					placeholderFontColor	: "#808080",
					placeholderFontFamily	: "Verdana",
					placeholderFontSize		: "14px",
					placeholderFontStyle	: "italic",
					placeholderFontVariant	: "normal",
					placeholderFontWeight	: "bold",
					select					: -1,
					textFontColor			: "#000000",
					textFontFamily			: "Verdana",
					textFontSize			: "14px",
					textFontStyle			: "normal",
					textFontVariant			: "normal",
					textFontWeight			: "bold",
					width					: 300
					
				}, options);
				
				
				
				// This is the name of the CSS namespace, so we do not have CSS naming conflicts
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
						
						// Add the gorilla namespace (as a class name)
						$(divWrapper).addClass(dropdownNamespace);
						
						// Attache the dataobject containing all the properties to the DOM element (this will help us in using the object data in future)
						$(divWrapper).data(dropdownNamespace, settings);
						
						
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
								"font-variant"	: settings.placeholderFontVariant,
								"font-weight"	: settings.placeholderFontWeight,
							}
						});
						
						$(divCurrent).append(divPlaceholder);
						
						
						
						
						// Creating and append the "arrow" span, with initial "down" arrow
						var spanArrow = $("<span>", {
							class: "arrow",
							css : {
								"color"		: settings.arrowColor,
								"display"	: settings.displayArrow,
								"font-size"	: settings.arrowSize,
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
							class: "ddlist",
							css: {
								height: settings.dropdownHeight
							}
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
										"float"			: settings.imageLocation,
										"margin-right"	: settings.imageLocation == "left" ? (settings.padding / 2) + "px" : 0,
										"margin-left"	: settings.imageLocation == "right" ? (settings.padding / 2) + "px" : 0
									}
								});
								
								var img = $("<img>", {
									class: "image",
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
										"margin-left"	: settings.imageLocation == "left" ? (settings.padding / 2) + "px" : 0,
										"margin-right"	: settings.imageLocation == "right" ? (settings.padding / 2) + "px" : 0
									}
								});
								
								
								if (ddText != "") {
									
									var divText = $("<div>", {
										class: "text",
										text: ddText,
										css: {
											"color"			: settings.textFontColor,
											"font-family"	: settings.textFontFamily,
											"font-size"		: settings.textFontSize,
											"font-style"	: settings.textFontStyle,
											"font-variant"	: settings.textFontVariant,
											"font-weight"	: settings.textFontWeight
										}
										
									});
									
									$(side2).append(divText);
								}
								
								
								if (description != undefined) {
									
									var divDescription = $("<div>", {
										class: "description",
										text: description,
										css: {
											"color"			: settings.descriptionFontColor,
											"font-family"	: settings.descriptionFontFamily,
											"font-size"		: settings.descriptionFontSize,
											"font-style"	: settings.descriptionFontStyle,
											"font-variant"	: settings.descriptionFontVariant,
											"font-weight"	: settings.descriptionFontWeight
										}
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
										class: "value",
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
						
						
						
						// Default item selection based on user input
						if ((settings.select >= 0) || ( settings.select < $(divContainer).find(".ddlist .dditem").length )) {
							
							// Remove the old content
							$(divCurrent).find(".content").remove();
							
							// Add new content div, with the content of the new selected index
							var newContentDiv = $("<div>", {
								class: "content"
							});
							
							$(newContentDiv).append($(ul).children(".dditem").eq(settings.select).html());
							
							// Append the new div to our DOM
							$(divCurrent).append(newContentDiv);
							
							// Set the item as "selected" in the drop down, and remove the "selected" class from all other siblings (so only one item is selected)
							$(ul).children(".dditem").eq(settings.select).addClass("selected").css("background-color", settings.hoverColor).siblings().removeClass("selected").css("background-color", settings.backgroundColor);
						}
						
						
						
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
							
							var newContentDiv = $("<div>", {
								class: "content"
							});
							
							$(newContentDiv).append($(this).html());
							
							$(this).closest(dropdownClassSelector).find(".current").append(newContentDiv);
							
							
							
							// Set the arrow to the down position
							$(this).closest(dropdownClassSelector).find(".current .arrow").html(settings.arrowDown);
							
							
							// Hide the drop down
							$(this).closest(dropdownClassSelector).find(".ddlist").hide();
							
							
							// Set the item as "selected" in the drop down, and remove the "selected" class from all other siblings (so only one item is selected)
							$(this).addClass("selected").css("background-color", settings.hoverColor).siblings().removeClass("selected").css("background-color", settings.backgroundColor);
							
							
							// Call the callback function
							if (typeof settings.onSelect == "function") {
								settings.onSelect();
							}
							
						});
						
						
						
						// Hover over items;
						$(divWrapper).find(".dditem").hover(function () {
							$(this).css("background-color", settings.hoverColor);
						}, function () {
							if (!$(this).hasClass("selected")){
								$(this).css("background-color", settings.backgroundColor);
							}
							
						});
						
						
					}); // End of: return this.each(function()
				
				} // End of: if (this.is("select"))
				
			}, // End of init: function (options)
			
			
			
			
			select: function (options) {
				
				// Set the value of "index" based on user input 
				var index;
				 
				if ("index" in options) {
					
					index = options.index;
					
					if (index < 0) {
						index = 0;
					}
					
					else if (index > $(this).find(".ddlist .dditem").length) {
						index = $(this).find(".ddlist .dditem").length - 1;
					}
					
				}
				
				else if ("value" in options) {
					
					index = $(this).find(".ddlist .dditem :input.value[value='" + options.value + "']").closest(".dditem").index();
					
				}
				
				
				// Get the object settings from the data object
				var settings = $(this).data(dropdownNamespace);
				
				// Update the settings object
				settings.select = index;
				
				// Remove the old content
				$(this).find(".current .content").remove();
				
				// Add new content div, with the content of the new selected index
				var newContentDiv = $("<div>", {
					class: "content"
				});
				
				$(newContentDiv).append($(this).find(".ddlist .dditem").eq(settings.select).html());
				
				// Append the new div to the "current" DOM
				$(this).find(".current").append(newContentDiv);
				
				// Set the item as "selected" in the drop down, and remove the "selected" class from all other siblings (so only one item is selected)
				$(this).find(".ddlist .dditem").eq(settings.select).addClass("selected").css("background-color", settings.hoverColor).siblings().removeClass("selected").css("background-color", settings.backgroundColor);
				
				// Update the data object
				$(this).data(dropdownNamespace, settings);
				
			},
			
			
			
			
			
			// Return the details of the selected element
			selected: function () {
				
				// Get the index of the selected element in relation to all other similar dropdown elements
				var selectedOption = $(this).find(".selected");
				var selectedIndex = $(this).find(".dditem").index( selectedOption );
				
				// Construct a "selected object" to return.
				// Note that index = -1 will be returned if the index is not found
				var selectedObject = {
						index: selectedIndex
				};
				
				
				// If we have an element, then we retrieve the necessary value and further contrsuct the "selected object"
				if ( selectedIndex >= 0 ) {
					
					selectedObject.text = selectedOption.find(".text").html();
					selectedObject.descriptoin = selectedOption.find(".description").html();
					selectedObject.imgSrc = selectedOption.find(".image").attr("imgsrc");
					selectedObject.value = selectedOption.find(".value").attr("value");
				}
				
				return selectedObject;
				
			} // End of: getSelectedOption: function ()
	};
	
	
	
	
	$.fn.gorillaDropdown = function(methodsOrOptions) {
		
		// Detecting if I have a method or input options
		// Details here: https://stackoverflow.com/questions/1117086/how-to-create-a-jquery-plugin-with-methods
		
		if (methods[methodsOrOptions]) {
            return methods[methodsOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		
		else if (typeof methodsOrOptions === "object" || !methodsOrOptions) {
			return methods.init.apply (this, arguments);
		}
		
	}; // End of: $.fn.gorillaDropdown = function()

} (jQuery));
