/**
 * Automated tests for Lists.
 * @author aandre@mit.edu, seropian@mit.edu
*/



///////////////
// GET Lists //
///////////////

test("List - GET /lists/", function () {
    login('admin', 'admin');

    var data = null;
    $.ajax({
        url : '/lists/',
        type: 'GET',
        async: false,
        success: function (result, status, xhr) {
            data = result;
        }
    });

    equal(data, {
          "lists": [
            {
              "__v": 0,
              "_id": "5445d4504c248c5c13d996db",
              "owner": "5445d4504c248c5c13d996d7",
              "title": "Homework"
            }
          ]
        }, "Correct lists.");
});

/////////////////
// DELETE List //
/////////////////
