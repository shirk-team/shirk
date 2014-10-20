/**
* Automated tests for Lists.
* @author aandre@mit.edu, seropian@mit.edu
*/

$.ajax({
    url : '/login',
    type: 'POST',
    data : {
        username: 'admin',
        password: 'admin'
    },
    success: function() {
        testGet();
    },
    error: function() {
        //TODO: change to throw error once we figure out login stuff
        testGet();
        // QUnit.test(title + ' login failed', function(assert) {});
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

function testGet() {
    var title = 'List - GET /lists/';

    testMethod(title, '/lists/', 'GET', function(data) {
        QUnit.test(title, function(assert) {
            lists = data.lists;
            assert.equal(lists.length, 1, 'Correct number of lists returned.');
            assert.equal(lists[0].title, 'Homework', 'Correct list returned.');

            testDeleteById(lists[0]._id);
            // TODO: test GET /lists/:id next         
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