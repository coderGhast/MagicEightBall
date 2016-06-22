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
    var response_text = get_response_text(user_data.current_response_number);
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
