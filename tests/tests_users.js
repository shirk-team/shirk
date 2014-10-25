/**
 * Automated tests for Users.
 * @author seropian@mit.edu
 */

/**
 * Tests the creation of new users and also serves to seed the user database for
 * the rest of the tests. In order to be repeatable, this test must first
 * delete the user it is going to create, to avoid duplicate user errors when
 * running the test twice in a row.
 */
$.ajax({
    url: '/users',
    type: 'DELETE',
    async: false,
}).done(function() {
    test('User - POST /users/', function () {
        console.log('USER TESTING');
        ok(user_create('test2', 'test2'), 'User is successfully created.');

        equal(user_create('test2', 'test3'), undefined,
            'Duplicate username is not allowed.');

        equal(user_create('test3', ''), undefined,
            'Blank password is not allowed.');
        
        equal(user_create('', 'test3'), undefined,
            'Blank username is not allowed.');
    });
});