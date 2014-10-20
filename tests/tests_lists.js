/**
* Automated tests for Lists.
* @author aandre@mit.edu
*/

function login (username, password, title, callback) {
    $.ajax({
        url : '/login',
        type: 'POST',
        data : {username: username, password: password},
        success: function() {
            callback(title);
        },
        error: function() {
            //TODO: change to throw error once we figure out login stuff
            callback(title);
            // QUnit.test(title + ' login failed', function(assert) {});
        }
    });
};

login('admin', 'admin', 'List - GET /lists/', function(title) {
    $.ajax({
        url : '/lists/',
        type: 'GET',
        async: false,
        success: function (data, textStatus, jqXHR) {
            QUnit.test(title, function(assert) {
                lists = data.lists;
                assert.equal(lists.length, 1, 'Correct number of lists returned.');
                assert.equal(lists[0].title, 'Homework', 'Correct list returned.');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title + ' request failed', function(assert) {});
        }
    });
});

/**
* Tests for creating and editing lists.
*
* @author tdivita@mit.edu
**/
// TODO(tdivita): Finish/make sure I did this right.
login('admin', 'admin', 'List - POST /lists/', function(title) {
    $.ajax({
        url : '/lists/',
        type: 'POST',
        async: false,
        data: {
            list: {
              title: "Brand New List"
            }
        }, 
        success: function (data, textStatus, jqXHR) {
            QUnit.test(title, function(assert) {
                lists = data.lists;
                assert.equal(lists.length, 1, 'Correct number of lists returned.');
                assert.equal(lists[0].title, 'Homework', 'Correct list returned.');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title + ' request failed', function(assert) {});
        }
    });
});


