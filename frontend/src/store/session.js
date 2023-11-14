import csrfFetch from "./csrf";

const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

export const receiveUser = ({user}) => ({
    type: RECEIVE_USER,
    user
})

export const removeUser = (userId) => ({
    type: REMOVE_USER,
    userId
});

export const login = (user) => async dispatch => {
    const res = await csrfFetch(('/api/session'), {
        method: 'POST',
        body: JSON.stringify(user)
    })
    restoreSession()

    if (res.ok) {
        const user = await res.json()
        sessionStorage.setItem('currentUser', JSON.stringify(user.user));
        dispatch(receiveUser(user))
    }
}

export const logout = (userId) => async dispatch => {
    const res = await csrfFetch((`/api/session`), {
        method: 'DELETE'
    })

    if (res.ok) {
        sessionStorage.setItem('currentUser', null);
        dispatch(removeUser(userId))
    }
}

export const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken)  {
        sessionStorage.setItem("X-CSRF-Token", csrfToken);
    }
}


export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    return response;
};

const initialState = { 
    currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    const nextState = {...(Object.freeze(state))};
    
    switch (action.type) {
        case RECEIVE_USER:
            nextState[action.user.id] = action.user;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default: 
            return nextState
    }
}

export default sessionReducer