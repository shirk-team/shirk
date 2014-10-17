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

testLogin('Correct username and correct password', 'admin', 'admin', {});

testLogin('Incorrect username and correct password', 'apple', 'admin', {
    error: 'Incorrect username.'
});

testLogin('Incorrect username and incorrect password', 'apple', 'apple', {
    error: 'Incorrect username.'
});

testLogin('Correct username and incorrect password', 'admin', 'apple', {
    error: 'Incorrect password.'
});