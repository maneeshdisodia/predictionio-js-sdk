// JavaScript library for interacting with the PredictionIO API.
// Author: Qui Nguyen

// Returns a PredictionIO API client object for an app.
//
// Takes the app_key, and an optional JSON object with options.
// Current options available:
// - host: the address of the API server.
var predictionio = function (app_key, options) {

  var APP_KEY,
    HOST = '';

  if (!app_key) {
      throw new Error("An app key is required to use the API.");
  }
  APP_KEY = app_key;
  if ( (options !== null) && (typeof options.host !== "undefined") ) {
    HOST = options.host;
  }

  // Makes an AJAX request to the specified endpoint, with the given method and data,
  // and then calls the callback on the server's response.
  var make_request = function (endpoint, method, data, callback) {
    return true;
  }

  // Adds a user, specified by the user_info JSON object, then calls the callback
  // function on the server's response.
  var add_user = function (user_info, callback) {
    if (typeof user_info.pio_uid === "undefined") {
      throw new Error("To add a user, you must specify the user's pio_uid.");
      // cannot contain \t or ,. How much error checking to do?
    }
    var data = JSON.parse(JSON.stringify(user_info));
    for(var propertyName in data) {
      if (propertyName.slice(0,4) === "pio_" && (!param_allowed(USER_PARAMS, propertyName))) {
        delete data[propertyName];
        // Log warning?
      }
    }
    make_request('users.json', 'POST', data, callback);
  }

  // Gets a user.
  var get_user = function(pio_uid, callback) {
    var endpoint = 'users/'.concat(pio_uid).concat('.json');
    make_request(endpoint, 'GET', callback);
  }

  // Deletes a user.
  var delete_user = function(pio_uid, callback) {
    var endpoint = 'users/'.concat(pio_uid).concat('.json');
    make_request(endpoint, 'DELETE', callback);
  }

  return {
    add_user: add_user,
    get_user: get_user,
    delete_user: delete_user,
  };
}