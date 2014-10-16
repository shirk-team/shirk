# Testing
===

### Testing directions

1. Create a test database at /tests/test_db (this folder is git-ignored).
2. Run <code>mongod --dbpath /tests/test_db.</code>.
3. Run <code>node /tests/seed_db.js</code> to seed the test database.

If you need to clear the test database, you can run 
<code>node /tests/clear_db.js</code>.