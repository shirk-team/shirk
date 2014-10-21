/**
 * Automated tests for Users.
 * @author seropian@mit.edu
 */

/**
 * This function tests the creation of new users and also serves to seed the
 * user database for the rest of the tests.
 */
test('User - POST /users/', function () {
    clear_all();

    ok(user_create('test1', 'test1'), 'User is successfully created.');

    equal(user_create('test1', 'test2'), undefined,
        'Duplicate username is not allowed.');

    equal(user_create('test2', ''), undefined,
        'Blank password is not allowed.');
    
    equal(user_create('', 'test2'), undefined,
        'Blank username is not allowed.');
});