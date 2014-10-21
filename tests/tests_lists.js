/**
 * Automated tests for Lists.
 * @author aandre@mit.edu, seropian@mit.edu
*/

// Authentication Helpers
function login (username, password) {
    $.ajax({
        url : '/login',
        type: 'POST',
        async: false,
        data : {
            username: username,
            password: password
        }
    });
}

function logout () {
    $.ajax({
        url : '/logout',
        type: 'POST',
        async: false
    });
}

/////////////////
// DELETE List //
/////////////////

/**
 * Deletion tests must be run in order, since they are destructive.
 */

$.ajax({
    url : '/login',
    type: 'POST',
    data : {
        username: 'admin',
        password: 'admin'
    },
    success: function() {
        getIDToDelete();
    },
    error: function() {
        getIDToDelete();
    }
});

function testMethod(title, url, method, onSuccess, onError) {
    $.ajax({
        url : url,
        type: method,
        async: false,
        success: onSuccess || function() {
            QUnit.test(title + ' succeeded and should not have',
                function(assert) {});
        },
        error: onError || function() {
            QUnit.test(title + ' failed and should not have',
                function(assert) {});
        }
    });
}

function getIDToDelete() {
    var title = 'List - DELETE /lists/:id';

    testMethod(title, '/lists/', 'GET', function(data) {
            QUnit.test(title, function(assert) {
                lists = data.lists;
                if (lists.length == 0){
                    alert('Please ensure you re-seed the test database after each run. The remanider of the DELETE tests are reliant on this.');
                    return;
                }
                testDeleteById(lists[0]._id);
            });
        });
}

function testDeleteById(id) {
    var title = 'List - DELETE /lists/:id';

    testMethod(title, '/lists/' + id, 'DELETE', function (data) {
        QUnit.test(title, function(assert) {
            assert.equal(data.listID, id, 'Correct list deleted.');

            testDeleteNoId();
        });
    });
}

function testDeleteNoId() {
    var title = 'List - DELETE /lists/';

    testMethod(title, '/lists/', 'DELETE', undefined,
        function (jqXHR, textStatus, errorThrown ) {
            QUnit.test(title, function(assert) {
                assert.equal(jqXHR.status, 404, 'Correct status code.');
                assert.equal(errorThrown, 'Not Found', 'Correct error message.');

                testDeleteBadId();
            });
        }
    );
}

function testDeleteBadId() {
    var title = 'List - DELETE /lists/617061706170617061706170';

    testMethod(title, '/lists/617061706170617061706170', 'DELETE', undefined,
        function (jqXHR, textStatus, errorThrown ) {
            QUnit.test(title, function(assert) {
                assert.equal(jqXHR.status, 404, 'Correct status code.');
                assert.equal(errorThrown, 'Not Found', 'Correct error message.');
            });
        }
    );
}
