var ball_canvas = new Object();

function setup(){
    ball_canvas.canvas = document.getElementById("ball_canvas");
    if (ball_canvas.canvas.getContext){
        ball_canvas.context = ball_canvas.canvas.getContext('2d');
    }
}


function draw(){

}

function display_quesitons_list(){
    
}

function update_display(){
    draw();
    display_questions_list();
}
