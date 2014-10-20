/**
* Automated tests for Lists.
* @author aandre@mit.edu
*/

function runTest (username, password, title, test, nextTest) {
    $.ajax({
        url : '/login',
        type: 'POST',
        data : {username: username, password: password},
        success: function() {
            test(title, nextTest);
        },
        error: function() {
            //TODO: change to throw error once we figure out login stuff
            test(title, nextTest);
            // QUnit.test(title + ' login failed', function(assert) {});
        }
    });
};


/**
 * THIS MUST BE RUN LAST BECAUSE IT DELETES THINGS FROM THE DB
 */
var testDelete = function(id) {
    runTest('admin', 'admin', 'List - DELETE /lists/', function(title) {
        $.ajax({
            url : '/lists/' + id,
            type: 'DELETE',
            async: false,
            success: function (data, textStatus, jqXHR) {
                QUnit.test(title, function(assert) {
                    assert.equal(data.listID, id);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                QUnit.test(title + ' request failed', function(assert) {});
            }
        });
    });
};

runTest('admin', 'admin', 'List - GET /lists/', function(title, nextTest) {
    $.ajax({
        url : '/lists/',
        type: 'GET',
        async: false,
        success: function (data, textStatus, jqXHR) {
            QUnit.test(title, function(assert) {
                lists = data.lists;
                assert.equal(lists.length, 1, 'Correct number of lists returned.');
                assert.equal(lists[0].title, 'Homework', 'Correct list returned.');
                nextTest(lists[0]._id);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            QUnit.test(title + ' request failed', function(assert) {});
        }
    });
}, testDelete);
