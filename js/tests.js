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

// When we ask for a response text, we expect to see the (known) response corresponding to that code.
QUnit.test("should return the expected response for the response number", function( assert ) {
    assert.equal(get_response_text(1), "It is certain");
    assert.equal(get_response_text(2), "It is decidedly so");
    assert.equal(get_response_text(3), "Without a doubt");
    assert.equal(get_response_text(4), "Yes, definitely");
    assert.equal(get_response_text(5), "You may rely on it");
    assert.equal(get_response_text(6), "As I see it, yes");
    assert.equal(get_response_text(7), "Most likely");
    assert.equal(get_response_text(8), "Outlook good");
    assert.equal(get_response_text(9), "Yes");
    assert.equal(get_response_text(10), "Signs point to yes");
    assert.equal(get_response_text(11), "Reply hazy try again");
    assert.equal(get_response_text(12), "Ask again later");
    assert.equal(get_response_text(13), "Better not tell you now");
    assert.equal(get_response_text(14), "Cannot predict now");
    assert.equal(get_response_text(15), "Concentrate and ask again");
    assert.equal(get_response_text(16), "Don't count on it");
    assert.equal(get_response_text(17), "My reply is no");
    assert.equal(get_response_text(18), "My sources say no");
    assert.equal(get_response_text(19), "Outlook not so good");
    assert.equal(get_response_text(20), "Very doubtful");   
});
