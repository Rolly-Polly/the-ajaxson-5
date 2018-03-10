
$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    
    
    document.getElementById("loading").onclick;

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
        
    // get the user's input text from the DOM
    var searchQuery = 
          document.getElementById("userinput").value;

     // TODO should be e.g. "dance"

    // configure a few parameters to attach to our request
    var params = { 
        api_key: "1i6Bf37qTsA1OOrWePNDzcUMHiQpLCkk", 
        tag : "jackson+5 " + searchQuery // TODO should be e.g. "jackson 5 dance"
    };
    
    console.log(params)

    var captcha = document.getElementById("captcha").value;
    if (captcha == "5") {
        document.getElementById("error").innerHTML = "";
        // make an ajax request for a random GIF
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
            data: params, // attach those extra parameters onto the request
            success: function(response) {
                console.log(response)
                var gif_url = response.data.image_url;
                console.log(gif_url);                 

                document.getElementById("gif").src = gif_url;
            },
            error: function() {
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);
            }
        });
    } else {
        document.getElementById("error").innerHTML = "No gifs for you";
    }

    // TODO
    // give the user a "Loading..." message while they wait
    
    
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr(!isCurrentlyLoaded);
    $("#feedback").attr(isCurrentlyLoaded);
}