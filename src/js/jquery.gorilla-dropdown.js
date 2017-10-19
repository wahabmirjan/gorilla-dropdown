(function ($) {
	
	$.fn.gorillaDropdown = function(options) {
		
		
		/*
		
		By default, this plugin will convert the following structure
		
		<select id="s2" class="some-class">
			<option value="saab" data-imgsrc="http://url/to/saab/logo" data-description="Description about Saab">Saab</option>
			<option value="mercedes" data-imgsrc="http://url/to/mercedes/logo" data-description="Description about Mercedes">Mercedes</option>
		</select>
		
		
		
		Into the following:
		
		<div id="s2" class="some-class gorilla-dropdown">
			
			<div class="container" style="width: 300px;">
				
			<div class="current collapsed" style="border-width: 1px;">Select</div>
				
				<ul class="ddlist">
					
					<li class="dditem">
						<div class="-float-side1">
							<img src="http://url/to/saab/logo">
						</div>
						
						<div class="-float-side2">
							<div>Saab</div>
							<div>Description about Saab</div>
						</div>
						
						<input value="saab" type="hidden">
						<div class="-clear-both"></div>
					</li>
					
					<li class="dditem">
						<div class="-float-side1">
							<img src="http://url/to/mercedes/logo">
						</div>
						<div class="-float-side2">
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
			width: 300
			
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
						width: settings.width + "px"
					}
				});
				
				
				// Append divContainer to divWrapper
				$(divWrapper).append(divContainer);
				
				
				// Create a div element with class "current"
				var divCurrent = $("<div>",{
					class: "current collapsed",
					text: "Select"
				});
				
				
				
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
						class: "dditem"
					});
					
					// Get and set an image element
					var imgsrc = $(this).data("imgsrc");
					
					if (imgsrc != undefined) {
						
						var side1 = $("<div>", {
							class: "-float-side1",
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
							class: "-float-side2",
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
					
					// Toggle the class for the currently selected item
					$(this).closest(dropdownClassSelector).find(".current").toggleClass("collapsed expanded");
					
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
							
							// Set the class for the currently selected item
							$(dropdownClassSelector).eq(event.data.indexOfLastDropdownClicked).find(".current").removeClass("expanded");
							$(dropdownClassSelector).eq(event.data.indexOfLastDropdownClicked).find(".current").addClass("collapsed");
							
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
					
					// Get the HTML of the item to the current item
					$(this).closest(dropdownClassSelector).find(".current").html( $(this).html() );
					
					// Set the class for the currently selected item
					$(this).closest(dropdownClassSelector).find(".current").removeClass("expanded");
					$(this).closest(dropdownClassSelector).find(".current").addClass("collapsed");
					
					
					// Hide the drop down
					$(this).closest(dropdownClassSelector).find(".ddlist").hide();
					
					
					// Set the item as "selected" in the drop down, and remove the "selected" class from all other siblings (so only one item is selected)
					$(this).addClass("-status-selected").siblings().removeClass("-status-selected");
				});
				
				
			}); // End of: return this.each(function()
		
		} // End of: if (this.is("select"))
		
	}; // End of: $.fn.gorillaDropdown = function()

} (jQuery));
