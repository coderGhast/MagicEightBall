// Return a random number between 1 and 20 for the resulting response
function get_response_number() {
    var response = Math.floor((Math.random() * 20) + 1);
    return response;
}

// If we pass a previous response, we don't want to see it again.
function get_new_response_number(last_response) {
    var current_response = last_response;
    while(current_response === last_response){
        current_response = get_response_number();
    }

    return current_response;
}

var response_text_choices = [
    "Failed to understand question",
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

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

// Take the question from the DOM and handle running, then call to update the display (canvas and list).
function get_user_question(){
    var question = document.getElementById('user_question_box').value;
    // Check that the user actually entered something, if not, tell them.
    // We allow a user to enter any question length, as who knows, maybe they have a big one.
    // No need on restriction (if it was server side processing we WOULD need to restrict).
    if(question.length == 0 || question == null){
        alert("Please enter a question");
    } else {
        user_data.current_response_number = submit_question(question);
        update_display();
    }
}

// Submit the question for storage and getting response text.
function submit_question(question){
    
    var response_number;
    if(user_data.previous_response_number > 0){
        response_number = get_new_response_number(user_data.previous_response_number);
    } else {
        response_number = get_response_number();
    }  

    // Update holding on to the last response (the one we just got now).
    user_data.previous_response_number = response_number;
    var response_text = response_text_choices[response_number];
    update_previous_questions(question, response_text);
    return response_number;
}

function setup(){
    // Make a call to get_previous_questions, as this will check our localStorage.
    user_data.previous_questions = get_previous_questions();
    setup_canvas();
    update_display();
}
