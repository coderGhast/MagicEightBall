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
