function draw(){
 var canvas = document.getElementById("drawing");
 if (canvas.getContext){
    var context = canvas.getContext('2d');
 }
}

// Return a random number between 1 and 20 for the resulting response
function get_response_number() {
    var response = Math.floor((Math.random() * 20) + 1);
    return response;
}

// If we pass a previous response, we don't want to see it again.
function get_new_response_number(last_response) {
    var current_response = last_response;
    while(current_response == last_response){
        current_response = get_response_number();
    }

    return current_response;
}
