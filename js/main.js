(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

})(jQuery); // End of use strict



window.addEventListener("load", function(){







  // Add a keyup event listener to our input element
  var name_input = document.getElementById('name-input');
  name_input.addEventListener("keyup", function(event){hinter(event)});

  // create one global XHR object 
  // so we can abort old requests when a new one is make
  window.hinterXHR = new XMLHttpRequest();
});

// Autocomplete for form
function hinter(event) {

  // retireve the input element
  var input = event.target;

  // retrieve the datalist element
  var drugs_list = document.getElementById('drugs_list');

  // minimum number of characters before we start to generate suggestions
  var min_characters = 0;

  if (input.value.length < min_characters ) { 
      return;
  } else { 

      // abort any pending requests
      window.hinterXHR.abort();

      

      window.hinterXHR.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {

              // We're expecting a json response so we convert it to an object
              var response = JSON.parse( this.responseText ); 

              // clear any previously loaded options in the datalist
              drugs_list.innerHTML = "";

              console.log("response JSON: " + JSON.stringify(response));

              response.pills.forEach(function(item,i) {
                if (i>1 && i <= 10){
                  // Create a new <option> element.
                  var option = document.createElement('li');

                ///parse item to get item.name
                  console.log("item:"+ JSON.stringify(item));

                  option.innerHTML = "<button onclick=\"location.href=\'.\/order.html\'\">"+item.name+"</button>";

                  // attach the option to the datalist element
                  drugs_list.appendChild(option);
                }
              });
          }
      };

      window.hinterXHR.open("GET", "http://localhost:8000/pills/?query=" + input.value, true);
      window.hinterXHR.setRequestHeader('Authorization', 'Token ccd5471275a6f116d06870e660b2198ad74986cd')
      window.hinterXHR.send()
  }
}

function validateForm(){

  // Get the input element
  var input = document.getElementById('name-input');
  // Get the datalist
  var drugs_list = document.getElementById('drugs_list');


  // If we find the input inside our list, we submit the form
  for (var element of huge_list.children) {
      if(element.value == input.value) {
          return true;
      }
  }

  // we send an error message
  alert("name input is invalid")
  return false;
}