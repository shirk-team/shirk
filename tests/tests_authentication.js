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
    $.get('/login', {
            username: username,
            password: password
        }, function(data, textStatus, jqXHR) {
            QUnit.test(title, function(assert) {
                var responseKeys = Object.keys(data);
                var expectedResponseKeys = Object.keys(expectedResponse);

                assert.equal(responseKeys.length, expectedResponseKeys.length);

                expectedResponseKeys.forEach(function(key) {
                    assert.equal(expectedResponse[key], data[key]);
                });
            });
        }
    );
}

testLogin('Authentication - Correct username and correct password', 'admin', 'admin', {});

testLogin('Authentication - Incorrect username and correct password', 'apple', 'admin', {
    error: 'Incorrect username.'
});

testLogin('Authentication - Incorrect username and incorrect password', 'apple', 'apple', {
    error: 'Incorrect username.'
});

testLogin('Authentication - Correct username and incorrect password', 'admin', 'apple', {
    error: 'Incorrect password.'
});