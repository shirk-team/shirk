/**
 * Authentication tests.
 * @author seropian@mit.edu
 */

/**
 * Check that a success response succeeded normally.
 * @param {String} title The title of the test.
 */
function checkOkay(title) {
    return function(data, textStatus, jqXHR) {
        QUnit.test(title, function(assert) {
            assert.equal(jqXHR.status, 200, 'Correct status code.');
        });
    }
}

/**
 * Send a login request and verify that the response is as expected.
 * @param  {String} title The title of the test.
 * @param  {String} username The username to log in.
 * @param  {String} password The password to log in.
 * @param  {String} expectedResponse What the server should return.
 */
function testLogin(title, username, password, errorMessage) {
    $.ajax('/login', {
        data: {
            username: username,
            password: password
        }, 
        success: checkOkay(title),
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title, function(assert) {
                assert.equal(jqXHR.responseText, errorMessage,
                    'Correct error message.');
                assert.equal(jqXHR.status, 401, 'Correct status code.');
            });
        },
        type: 'POST'
    });
}

/**
 * Tests that logout succeeds.
 */
function testLogout(title, expectedResponse) {
    $.ajax('/logout', {
        success: checkOkay(title),
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title + ' failed and should not have',
                function(assert) {});
        },
        type: 'POST'
    });
}

testLogin('Authentication - Login: correct username and correct password',
    'admin', 'admin');

testLogout('Authentication - Logout');

testLogin('Authentication - Login: incorrect username and correct password',
    'apple', 'admin', 'Incorrect username');

testLogin('Authentication - Login: incorrect username and incorrect password',
    'apple', 'apple', 'Incorrect username');

testLogin('Authentication - Login: correct username and incorrect password',
    'admin', 'apple', 'Incorrect password');