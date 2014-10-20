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

function testMethod(title, url, method, onSuccess) {
    $.ajax({
        url : url,
        type: method,
        async: false,
        success: onSuccess,
        error: function() {
            QUnit.test(title + ' request failed', function(assert) {});
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

            testDelete(lists[0]._id);            
        });
    });
}

function testDelete(id) {
    var title = 'List - DELETE Homework list';

    testMethod(title, '/lists/' + id, 'DELETE', function (data) {
            QUnit.test(title, function(assert) {
                assert.equal(data.listID, id);
            });
        }
    );
}