$(document).ready(function(){

//initial array of cartoons
var cartoons = ["Samurai Jack", "Over the Garden Wall", "Dragon Ball Z", "Invader Zim", "Family Guy", "Bob's Burgers"]
allGifs = " "

//function for displaying tv show data
function renderButtons() {
//deleting the cartoons buttons prior to adding new cartoons buttons
$("#cartoons-view").empty();

  //looping through the array of cartoons
  for (var i=0; i < cartoons.length; i++) {

  //create buttons for each cartoon in the array.
  var a = $('<button>');
  //Adding a class
  a.addClass('cartoon');
  //adding a data-attribute with a value of the television at index i
  a.attr('data-name', cartoons[i]);
  //providing the button's text with a value of the cartoon at index i
  a.text(cartoons[i]);
  //adding the button the html
  $("#cartoons-view").append(a);
  }
  s=$("#cartoon-input").focus();
}
renderButtons();

//handles events where one button is clicked
$("#add-cartoon").on('click', function() {
  event.preventDefault();
  //This line will grab the text from the input box
  var cartoon = $("#cartoon-input").val().trim();
  //this cartoon from the textbox is then added to our array
  cartoons.push(cartoon);
  renderButtons();
});

$(document).on('click', 'button',  function() {
	// Deletes the cartoons prior to adding new cartoon
	$('#allGifs').empty();
  // 'this' refers to the button that was clicked
  var b = $(this).attr('data-name');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=IFDgF4pTiMKsgKf5hFHcF42l0Roieql3";  //query api url and public key
  console.log(queryURL);

  // get request from API
  $.ajax({
    url: queryURL,
    method: 'GET'
    })
  //after the data comes back from the API
  .done(function(response) {
    console.log(response);
  	//Storing an array of results in the results variable
    var results = response.data;
    //Looping over every result item
    for (var i = 0; i < results.length; i++) {
       //creating a div with the class item
      var gifDiv = $('<div class="item">');
       //storing the result items rating
      var rating = results[i].rating;
       //creating an element to have theratingdisplayed
    	var r = $('<p>').text("Rating: " + rating);
    	 //creating a image tag
      var gifImage = $('<img>');
       //giving the image tag an src attribute of a property pulled off the result item
  		gifImage.attr('src', results[i].images.fixed_height_still.url)
    	.attr('data-still', results[i].images.fixed_height_still.url)
    	.attr('data-animate', results[i].images.fixed_height.url)
    	.attr('data-state', "still")
    	.addClass("showImage");
       //displaying the rating & image
      gifDiv.append(r)
      .append(gifImage);

      $('#allGifs').prepend(gifDiv);
    }
	});
});
// Listens for a click on any gif
$(document).on('click', '.showImage',  function() {
	var state = $(this).data('state');
	//If the clicked image's state is still, update its src attribute to what its data-animate value is
  if (state == "still") {
    console.log("still image works");
	// Then, set the image to animate
  $(this).attr('src', $(this).data('animate'))
  .data('state', 'animate');
	} else {
	//  else set source to the still value
  console.log("animated image works");
  $(this).attr('src', $(this).data('still'))
	.data('state', 'still');
	 }
  });
});
