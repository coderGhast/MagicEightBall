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

// An Object for handling the user data
var user_data = new Object();
user_data.previous_questions = ["","",""];
user_data.previous_response = 0;
user_data.current_response_number = "";

// Return the previous questions, that should persist through multiple sessions.
function get_previous_questions(){
    // Check for HTML5 local storage (supported in most modern browsers, e.g. IE8+ style)
    if (typeof(Storage) !== "undefined") {
        var stored_questions = JSON.parse(localStorage.getItem("stored_previous_questions"));
        if(stored_questions == null || stored_questions.length == 0){
            return user_data.previous_questions;
        } else {
            return stored_questions;
        }
    // If no local storage, return the global field of asked questions for this session.
    } else {
        return user_data.previous_questions;
    }
}

// Update the list of questions stored with the new question.
function update_previous_questions(question, response_text){
    user_data.previous_questions.push(question + " : " + response_text);
    user_data.previous_questions.shift();
    // Once the local field is updated, update localStorage too, if possible
    if(typeof(Storage) !== "undefined"){
       localStorage.setItem("stored_previous_questions", JSON.stringify(user_data.previous_questions)); 
   }
}

// Take the question from the DOM and handle running.
function get_user_question(){
    var question = document.getElementById('user_question_box').value;
    user_data.current_response = submit_question(question);
    update_display();
    alert(question + " " + user_data.current_response);
}

// Submit the question for storage and getting response text.
function submit_question(question){
    
    var response_number;
    if(user_data.previous_response_number > 0){
        response_number = get_new_response_number(user_data.previous_response_number);
    } else {
        response_number = get_response_number();
    }  

    var response_text = get_response_text(response_number);
    update_previous_questions(question, response_text);
    return response_text;
}

function setup(){
    // Make a call to get_previous_questions, as this will check our localStorage.
    user_data.previous_questions = get_previous_questions();
    setup_canvas();
    update_display();
}
