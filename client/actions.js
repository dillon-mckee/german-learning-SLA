var FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
var fetchDataSuccess = function(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        data: data
    };
};

var FETCH_DATA_ERROR= 'FETCH_DATA_ERROR';
var fetchDataError = function(error) {
    return {
        type: FETCH_DATA_ERROR,
        error: error
    };
};

var fetchData = function() {
    return function(dispatch) {
        var url = 'http://localhost:3000/api/words';
        return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(
                fetchDataSuccess(data)
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchDataError(error)
            );
        });
    }
};

var postData = function(title) {
    return function(dispatch) {
        var url = 'http://localhost:3000/api/all';
        return fetch(url, {
      	  method: 'POST',
          body: JSON.stringify({title: title}),
          headers: new Headers({
		          'Content-Type': 'application/json'
	        })
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(
                fetchTodoSuccess(data)
                // I'm using the same success and error actions,
                // but you might want to use different actions
                // for these functions.
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchTodoError(error)
            );
        });
    }
};

var putData = function(id, title) {
    return function(dispatch) {
        var url = 'http://localhost:3000/api/' + id;
        return fetch(url, {
      	  method: 'PUT',
          body: JSON.stringify({title: title}),
          headers: new Headers({
		          'Content-Type': 'application/json'
	        })
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(
                fetchDataSuccess(data)
                // I'm using the same success and error actions,
                // but you might want to use different actions
                // for these functions.
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchDataError(error)
            );
        });
    }
};

var putStatus = function(id, status) {
    return function(dispatch) {
        var url = 'http://localhost:3000/api/' + id;
        return fetch(url, {
      	  method: 'PUT',
          body: JSON.stringify({status: status}),
          headers: new Headers({
		          'Content-Type': 'application/json'
	        })
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(
                fetchDataSuccess(data)
                // I'm using the same success and error actions,
                // but you might want to use different actions
                // for these functions.
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchDataError(error)
            );
        });
    }
};

exports.putStatus = putStatus;
exports.putData = putData;
exports.postData = postData;
exports.fetchData = fetchData;

exports.FETCH_DATA_SUCCESS = FETCH_DATA_SUCCESS;
exports.fetchDataSuccess = fetchDataSuccess;
exports.FETCH_DATA_ERROR = FETCH_DATA_ERROR;
exports.fetchDataError = fetchDataError;
