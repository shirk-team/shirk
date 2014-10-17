/**
 * Automated tests for Lists.
 * @author aandre@mit.edu
 */

function login (username, password) {
  $.ajax({
    url : "/login",
    type: "GET",
    data : {username: username, password: password}
  });
}

test("List - GET /lists/", function () {
  login('admin', 'admin');
  var lists;
  $.ajax({
    url : "/lists/",
    type: "GET",
    async: false,
    success: function (data, textStatus, jqXHR) {
      lists = data.lists;
    }
  });
  notDeepEqual(lists, [], "Lists for user 'admin'.");
});