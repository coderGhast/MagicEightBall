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
})
