var ball_canvas = new Object();

function setup_canvas(){
    ball_canvas.canvas = document.getElementById("ball_canvas");
    if (ball_canvas.canvas.getContext){
        ball_canvas.context = ball_canvas.canvas.getContext('2d');
    }
}


function draw(){

}

function display_questions_list(){
    var questions_list_div = document.getElementById("questions_list");
    var questions_list_text = "";
    for(var i = user_data.previous_questions.length -1; i >= 0; i--){
        questions_list_text += user_data.previous_questions[i] + "<br />";
    }
    questions_list_div.innerHTML = questions_list_text;
}

function update_display(){
    draw();
    display_questions_list();
}
