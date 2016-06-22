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

function get_response_text(response_number){
    var response;
    switch(response_number){
        case(1) : 
            response = "It is certain"
            break; 
        case(2) :
            response = "It is decidedly so"
            break;
        case(3) :
            response = "Without a doubt"
            break;
        case(4) :
            response = "Yes, definitely"
            break;
        case(5) :
            response = "You may rely on it"
            break;
        case(6) :
            response = "As I see it, yes"
            break;
        case(7) :
            response = "Most likely"
            break;
        case(8) :
            response = "Outlook good"
            break;
        case(9) :
            response = "Yes"
            break;
        case(10) :
            response = "Signs point to yes"
            break;
        case(11) :
            response = "Reply hazy try again"
            break;
        case(12) :
            response = "Ask again later"
            break;
        case(13) :
            response = "Better not tell you now"
            break;
        case(14) :
            response = "Cannot predict now"
            break;
        case(15) :
            response = "Concentrate and ask again"
            break;
        case(16) :
            response = "Don't count on it"
            break;
        case(17) :
            response = "My reply is no"
            break;
        case(18) :
            response = "My sources say no"
            break;
        case(19) :
            response = "Outlook not so good"
            break;
        case(20) :
            response = "Very doubtful"
            break;
        default :
            response = "Failed to understand question"
    }
    return response;
}
