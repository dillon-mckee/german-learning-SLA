import Cookies from 'js-cookie';
console.log(Cookies)

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const fetchDataSuccess = (data) => {
    return {
        type: FETCH_DATA_SUCCESS,
        data: data
    };
};

export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const fetchDataError = (error) => {
    return {
        type: FETCH_DATA_ERROR,
        error: error
    };
};

export const fetchData = () => {
      return (dispatch) => {
       let token = Cookies.get('accessToken');
       let headers = new Headers();
       headers.append('Authorization', `Bearer ` + token);
       let url = 'https://sleepy-lowlands-87122.herokuapp.com/api/words';
       return fetch(url, {headers}).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                let error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return dispatch(
                fetchDataSuccess(data)
            );
        })
        .catch((error) => {
            return dispatch(
                fetchDataError(error)
            );
        });
    }
};

export const postData = (userAnswer) => {
    return (dispatch) => {
        let token = Cookies.get('accessToken');
        let headers = new Headers();
        headers.append('Authorization', `Bearer ` + token);
        headers.append('Content-Type', 'application/json');
        console.log(headers);
        let url = 'https://sleepy-lowlands-87122.herokuapp.com/api/words';
        return fetch(url, {
      	  method: 'POST',
          body: JSON.stringify({userAnswer: userAnswer}),
          headers: headers
      }).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return dispatch(
                postAnswerSuccess(data)
            );
        })
        .catch((error) => {
            return dispatch(
                postAnswerError(error)
            );
        });
    }
};



export const POST_ANSWER_SUCCESS = 'POST_ANSWER_SUCCESS';
export const postAnswerSuccess = (data) => {
    return {
        type: POST_ANSWER_SUCCESS,
        data: data
    };
};

export const POST_ANSWER_ERROR= 'POST_ANSWER_ERROR';
export const postAnswerError = (error) => {
    return {
        type: POST_ANSWER_ERROR,
        error: error
    };
};

export const GET_NEXTWORD_SUCCESS = 'GET_NEXTWORD_SUCCESS';
export const getNextWordSuccess = (data) => {
    return {
        type: GET_NEXTWORD_SUCCESS,
        data: data
    };
};

export const GET_NEXTWORD_ERROR= 'GET_NEXTWORD_ERROR';
export const getNextWordError = (error) => {
    return {
        type: GET_NEXTWORD_ERROR,
        error: error
    };
};

export const putData = (id, title) => {
    return (dispatch) => {
        let url = 'https://sleepy-lowlands-87122.herokuapp.com/api/' + id;
        return fetch(url, {
      	  method: 'PUT',
          body: JSON.stringify({title: title}),
          headers: new Headers({
		          'Content-Type': 'application/json'
	        })
        }).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return dispatch(
                fetchDataSuccess(data)
            );
        })
        .catch((error) => {
            return dispatch(
                fetchDataError(error)
            );
        });
    }
};

var putStatus = (id, status) => {
    return function(dispatch) {
        let url = 'https://sleepy-lowlands-87122.herokuapp.com/api/' + id;
        return fetch(url, {
      	  method: 'PUT',
          body: JSON.stringify({status: status}),
          headers: new Headers({
		          'Content-Type': 'application/json'
	        })
        }).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return dispatch(
                fetchDataSuccess(data)
            );
        })
        .catch((error) => {
            return dispatch(
                fetchDataError(error)
            );
        });
    }
};

export const START_GAME = 'START_GAME';
export const startGame = function() {
    return {
        type: START_GAME
    }
};

export const NEXT_WORD = 'NEXT_WORD';
export const nextWord = () => {
    return (dispatch) => {
       let token = Cookies.get('accessToken');
       let headers = new Headers();
       headers.append('Authorization', `Bearer ` + token);
       let url = 'https://sleepy-lowlands-87122.herokuapp.com/api/words';
       return fetch(url, {headers}).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return dispatch(
                getNextWordSuccess(data)
            );
        })
        .catch((error) => {
            return dispatch(
                getNextWordError(error)
            );
        });
    }
};
