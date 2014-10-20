/**
 * Authentication tests.
 * @author seropian@mit.edu
 */

/**
 * Send a login request and verify that the response is as expected.
 * @param  {String} title The title of the test.
 * @param  {String} username The username to log in.
 * @param  {String} password The password to log in.
 * @param  {String} expectedResponse What the server should return.
 */
function testLogin(title, username, password, expectedResponse) {

    $.ajax('/login', {
        data: {
            username: username,
            password: password
        }, 
        success: function(data, textStatus, jqXHR) {
            console.log('success', data, textStatus, jqXHR);
            QUnit.test(title, function(assert) {
                // var responseKeys = Object.keys(data);
                // var expectedResponseKeys = Object.keys(expectedResponse);

                // assert.equal(responseKeys.length, expectedResponseKeys.length);

                // expectedResponseKeys.forEach(function(key) {
                //     assert.equal(expectedResponse[key], data[key]);
                // });
                // TODO: figure out what desired behavior is here
                assert.ok(expectedResponse.error === undefined);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title, function(assert) {
                if (expectedResponse.error !== undefined) {
                    assert.equal(errorThrown, expectedResponse.error);
                    assert.equal(jqXHR.status, expectedResponse.status);
                }
            });
        },
        type: 'POST'
    });
}

testLogin('Authentication - Correct username and correct password', 'admin', 'admin', {});

testLogin('Authentication - Incorrect username and correct password', 'apple', 'admin', {
    error: 'Unauthorized',
    status: 401
});

testLogin('Authentication - Incorrect username and incorrect password', 'apple', 'apple', {
    error: 'Unauthorized',
    status: 401
});

testLogin('Authentication - Correct username and incorrect password', 'admin', 'apple', {
    error: 'Unauthorized',
    status: 401
});