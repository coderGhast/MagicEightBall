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

// Calls to draw the actions on the canvas
function draw(){
    var context = ball_canvas.context;
    
    // fresh canvas
    context.clearRect(0, 0, ball_canvas.canvas.width, ball_canvas.canvas.height);
    
    // ball
    context.beginPath();
    context.arc(ball_visual.centre_x, ball_visual.centre_y, ball_visual.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#0a0a0a";
    context.fill();

    // window
    context.beginPath();
    context.arc(ball_visual.centre_x, ball_visual.centre_y, ball_visual.window_radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "#ffffff";
    context.stroke();

    // text
    if(user_data.current_response_number > 0){      
        // die
        context.fillStyle = "#003399";
        context.beginPath();
        context.moveTo(ball_visual.centre_x, ball_visual.centre_y - 75);
        context.lineTo(ball_visual.centre_x + 70, ball_visual.centre_y + 50);
        context.lineTo(ball_visual.centre_x - 70, ball_visual.centre_y + 50);
        context.fill();

        context.font = "10px Arial";
        context.fillStyle = "#ffffff";
        var response_text = get_response_text(user_data.current_response_number);
        var response_text_break = "";
        for(var i=0; i < response_text.length; i++){
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
}

// Putting the content of the previous questions list into the correct element
function display_questions_list(){
    var questions_list_div = document.getElementById("questions_list");
    var questions_list_text = "";
    for(var i = user_data.previous_questions.length -1; i >= 0; i--){
        questions_list_text += user_data.previous_questions[i] + "<br />";
    }
    questions_list_div.innerHTML = questions_list_text;
}

// Calls to other required functions when this method is called to (e.g. by question submission)
function update_display(){
    draw();
    display_questions_list();
}
