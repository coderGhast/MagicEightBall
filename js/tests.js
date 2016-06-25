// Make sure our returned numbers are between 1 and 20. There's a chance with RNG that we may never hit upon a
// bad number, until it counts. Running the test 100 times to try and counter this, with results printed too.
QUnit.test("should get random number between 1 and 20 inclusive", function( assert ) {
    for(var i=0; i < 100; i++){
        var response_number = get_response_number();
        assert.ok(response_number >= 1 && response_number <= 20, "Passed! Number returned was " + response_number );
    }
});

// This test is a bit flakey, as with RNG, there's a very small chance we may never see that number again.
// Running the test 100 times, and showing results for manual inspection.
QUnit.test("should not get the same response twice in a row", function( assert ) {
    for(var i=0; i < 100; i++){
        var last_response = get_response_number();
        var response_number = get_new_response_number(last_response);
        assert.ok(response_number != last_response, "Passed! Number was not the same. Received:" + response_number + " Number to avoid:" + last_response);
    }
});

// When a question is submitted, save it to show later - truncating answer response (RNG)
QUnit.test("should save the last question asked locally (in LocalStorage and/field)", function ( assert ) {
    var test_question = "saved 7";
    submit_question(test_question);
    var previous_question = get_previous_questions()[2].substring(0, 7);
    assert.equal(previous_question, test_question,  "Matched \'" + test_question + "\'' with \'" + previous_question + "\'");
});

// Make sure that of the save questions, the oldest is replaced by the newest - truncating answer response (RNG)
QUnit.test("should overwrite the oldest question with the newest", function( assert ){
    var test_question_to_go_away = "some question - test question 1";
    submit_question("saved 1");
    submit_question("saved 2");
    submit_question("saved 3");
    submit_question("saved 4");
    var previous_question_list = get_previous_questions();
    for(var i=0; i < previous_question_list.length; i++){
        var test_number = i + 2;
        var test_text = "saved " + test_number;
        var previous_question = previous_question_list[i].substring(0, 7);
        assert.equal(previous_question, test_text, "Matched \'" + test_text + "\' with \'" + previous_question + "\'");
    }
});
