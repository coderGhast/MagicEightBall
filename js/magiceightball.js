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


// Return the previous questions, that should persist through multiple sessions.
function get_previous_questions(){
    // Check for HTML5 local storage (supported in most modern browsers, e.g. IE8+ style)
    if (typeof(Storage) !== "undefined") {
        var stored_questions = JSON.parse(localStorage.getItem("stored_previous_questions"));
        if(stored_questions == null || stored_questions.length === 0){
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
    if(question.length === 0 || question == null){
        alert("Please enter a question");
    } else {
        user_data.current_response_number = submit_question(question, user_data.previous_response_number);
        update_previous_questions(question, response_text_choices[user_data.current_response_number]);
        update_display();
    }
}

// Submit the question for storage and getting response text.
function submit_question(question, previous_response_number){
    
    var response_number;
    if(previous_response_number > 0){
        response_number = get_new_response_number(previous_response_number);
    } else {
        response_number = get_response_number();
    }  
    
    return response_number;
}

// An Object for handling the user data
var user_data = new Object();
user_data.previous_questions = ["","",""];
user_data.previous_response = 0;
user_data.current_response_number = "";

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

// Draw a circle to represent to ball.
function draw_ball(context){
    // ball
    context.beginPath();
    context.arc(ball_visual.centre_x, ball_visual.centre_y, ball_visual.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#0a0a0a";
    context.fill();
}

// Draw a circle to represent the 'window' into the ball where we can see the die and response.
function draw_window(context){
    // window
    context.beginPath();
    context.arc(ball_visual.centre_x, ball_visual.centre_y, ball_visual.window_radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "#ffffff";
    context.stroke();
}

// Draw the triangular die inside the ball.
function draw_die(context){
    context.fillStyle = "#003399";
    context.beginPath();
    context.moveTo(ball_visual.centre_x, ball_visual.centre_y - 75);
    context.lineTo(ball_visual.centre_x + 70, ball_visual.centre_y + 50);
    context.lineTo(ball_visual.centre_x - 70, ball_visual.centre_y + 50);
    context.fill();
}

// Draws text on the canvas (appears on the die). Centred and split to fit within the shape.
// Canvas doesn't have multi-line support. Doing multiple text paints is the only option.
function draw_text(context){
    context.font = "10px Arial";
    context.fillStyle = "#ffffff";
    var response_text = response_text_choices[user_data.current_response_number];
    var response_text_break = "";
    for(var i=0; i < response_text.length; i++){
        // If we have a longer response and find a space, split it there.
        if(i > 10 && response_text[i] == " "){
            response_text_break = response_text.substring(i,response_text.length);
            response_text = response_text.substring(0, i);
            break;
        }
    }
    context.textAlign="center";
    context.fillText(response_text, ball_visual.centre_x, ball_visual.centre_y);
    context.fillText(response_text_break, ball_visual.centre_x, ball_visual.centre_y + 10);
}

function draw_figure_eight(context){
    context.font = "160px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign="center";
    context.fillText("8", ball_visual.centre_x, ball_visual.centre_y + 50);  
}

// Calls to draw on the canvas for a new response, in order for overlaying correctly.
function draw(){
   var context = ball_canvas.context; 
    // fresh canvas
    context.clearRect(0, 0, ball_canvas.canvas.width, ball_canvas.canvas.height);
    draw_ball(context);
    draw_window(context);
    // If a question has been asked this session, display the die and response.
    if(user_data.current_response_number > 0){   
        draw_die(context);
        draw_text(context);
    } else {
        // Display a figure 8 to begin with, before any responses.
        draw_figure_eight(context);
    }
}

// Putting the content of the previous questions list into the correct element
function display_questions_list(){
    var questions_list_div = document.getElementById("questions_list");
    var questions_list_text = "<ul id=\"questions_list_element\">";
    for(var i = user_data.previous_questions.length -1; i >= 0; i--){
        questions_list_text +="<li>" + user_data.previous_questions[i] + "</li>";
    }
    questions_list_text += "</li></ul>"
    questions_list_div.innerHTML = questions_list_text;
}




// Calls to other required functions when this method is called to (e.g. by question submission)
function update_display(){
    // canvas
    draw();
    // DOM displaying results
    display_questions_list();
}

function setup(){
    // Make a call to get_previous_questions, as this will check our localStorage.
    user_data.previous_questions = get_previous_questions();
    setup_canvas();
    update_display();
}


var ball_canvas = new Object();
var ball_visual = new Object();

// Setup the canvas for use
function setup_canvas(){
    ball_canvas.canvas = document.getElementById("ball_canvas");
    if (ball_canvas.canvas.getContext){
        ball_canvas.context = ball_canvas.canvas.getContext('2d');
        ball_canvas.canvas.width = 400;
        ball_canvas.canvas.height = 400;
    }
    ball_visual.centre_x = ball_canvas.canvas.width / 2;
    ball_visual.centre_y = ball_canvas.canvas.height / 2;
    ball_visual.radius = 180;
    ball_visual.window_radius = 90;
}

if(document.getElementById("ball_canvas")){
    setup();
}
