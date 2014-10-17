# Testing
===

### Testing directions

1. Create the folder /tests/test_db (this folder is git-ignored).
2. Run <code>mongod --dbpath /tests/test_db</code>.
3. Run <code>node /tests/seed_db.js</code> to seed the test database.
4. To run the authentication tests, start the server and visit
<code>localhost:8080/authentication_tests.html</code>. You cannot run the tests
without the server because cross-origin AJAX calls are a big no-no.

If you need to clear the test database, you can run 
<code>node /tests/clear_db.js</code>.