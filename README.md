# Project 3 - Shirk: A Forgiving Task Manager
===

# Automated Tests 
### Seed Database
Populate the database with mock users, for the purpose of running controlled tests.

1. Create the folder /tests/test_db (this folder is git-ignored).
2. Run <code>mongod --dbpath /tests/test_db</code>.
3. Run <code>node /tests/seed_test_users.js</code> to seed the test database.

### Clear Database
If you need to clear the test database, you can run 
<code>node /tests/clear_db.js</code>.

### Running Tests
To run automated tests, start the server and visit
<code>localhost:8080/tests.html</code>. You cannot run the tests
without the server because cross-origin AJAX calls are prohibited.

# Roles
* API Design - all
* Schemas - Lily
* Users and Authentication - Lily
* Seed Database/Test Setup Stuff - Lily
* Other Test Structure Stuff - Andre
* File Structure - Lily/Andre
* Filtering Tasks - Andre (Andre's Feature)
* Deleting Lists and Tasks - Lily (Lily's Feature)
* Editing Lists and Tasks - Tricia (Tricia's Feature)
* Creating Lists and Tasks - Tricia
* Testing - all, for our own parts