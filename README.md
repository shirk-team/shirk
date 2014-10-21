# Project 3 - Shirk: A Forgiving Task Manager
===

# Automated Tests
### Seed Database
Populate the database with mock information, for the purpose of running controlled tests.

1. Create the folder /tests/test_db (this folder is git-ignored).
2. Run <code>mongod --dbpath /tests/test_db</code>.
3. Run <code>node /tests/seed_db.js</code> to seed the test database.

### Clear Database
If you need to clear the test database, you can run 
<code>node /tests/clear_db.js</code>.

### Running Tests
To run automated tests, start the server and visit
<code>localhost:8080/tests.html</code>. You cannot run the tests
without the server because cross-origin AJAX calls are prohibited.

Please note, the database needs to be cleared and re-seeded for each run, since the deletion/modification operations are destructive.