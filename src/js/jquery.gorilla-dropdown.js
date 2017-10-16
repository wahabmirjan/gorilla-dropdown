(function ($) {

	$.fn.ddGorilla = function(test) {
		
		// This is the name of the CSS namespace, so we do not have CSS naming conflicts
		var dropdownClassName = "gorilla-dropdown";
		var dropdownClass = "." + dropdownClassName;
		
		
		
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
				
				
				$(divWrapper).addClass(dropdownClassName);
				
				
				
				
				var divContainer = $("<div>", {
					class: "container"
				});
				
				// Append divContainer to divWrapper
				$(divWrapper).append(divContainer);
				
				
				// Create a div element with class "current"
				var divCurrent = $("<div>",{
					class: "current",
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
						
						var aside1 = $("<div>", {
							class: "-float-side1",
						});
						
						var img = $("<img>", {
							src: imgsrc
						});
						
						
						$(aside1).append(img);
						$(li).append(aside1);
						
						
						$(this).removeAttr("data-imgsrc");
						
					}
					
					
					var ddText = $(this).html().trim();
					var description = $(this).data("description");
					
					if ((ddText != "") || (description != undefined)) {
						
						var aside2 = $("<aside>", {
							class: "-float-side2",
						});
						
						
						if (ddText != "") {
							
							var divText = $("<div>", {
								text: ddText
							});
							
							$(aside2).append(divText);
						}
						
						
						if (description != undefined) {
							
							var divDescription = $("<div>", {
								text: description
							});
							
							$(aside2).append(divDescription);
							
							
							$(this).removeAttr("data-description");
						}
						
						
						$(li).append(aside2);
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
					$(this).closest(dropdownClass).find(".ddlist").toggle();
					
					
					// TODO - Must revisit 
					// Set up an event listener so that clicking anywhere outside will close the dropdown menu
					// Details: https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element?page=3#8603563
					$("html").click(function(event) {
						
						//check up the tree of the click target to check whether user has clicked outside of menu
						if ($(event.target).closest(dropdownClass).length==0) {
							
							// Hide the dropdown menu
							$(dropdownClass).find(".ddlist").hide();
							
							
							
							// This event listener has done its job so we can unbind it.
							$(this).unbind(event);
						}
						
					});
				});
				
				
				// Selecting an item from the dropdown list
				$(divWrapper).find(".dditem").click(function () {
					
					// Get the HTML of the item to the current item
					$(this).closest(dropdownClass).find(".current").html( $(this).html() );
					
					
					// Hide the drop down
					$(this).closest(dropdownClass).find(".ddlist").hide();
					
					// Set the item as "selected" in the drop down, and remove the "selected" class from all other siblings (so only one item is selected)
					$(this).addClass("-status-selected").siblings().removeClass("-status-selected");
				});
				
				
				
			}); // End of: return this.each(function()
		
		} // End of: if (this.is("select"))
		
	}; // End of: $.fn.ddGorilla = function()

} (jQuery));
