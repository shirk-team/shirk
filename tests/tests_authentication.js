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
            QUnit.test(title, function(assert) {
                assert.equal(jqXHR.status, expectedResponse.status,
                    'Correct status code.');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title, function(assert) {
                if (expectedResponse.error !== undefined) {
                    assert.equal(jqXHR.responseText, expectedResponse.error,
                        'Correct error message.');
                    assert.equal(jqXHR.status, expectedResponse.status,
                        'Correct status code.');
                }
            });
        },
        type: 'POST'
    });
}

testLogin('Authentication - Correct username and correct password', 'admin',
    'admin', {status: 200});

testLogin('Authentication - Incorrect username and correct password', 'apple',
    'admin', {error: 'Incorrect username', status: 401});

testLogin('Authentication - Incorrect username and incorrect password', 'apple',
    'apple', {error: 'Incorrect username', status: 401});

testLogin('Authentication - Correct username and incorrect password', 'admin',
    'apple', {error: 'Incorrect password', status: 401});