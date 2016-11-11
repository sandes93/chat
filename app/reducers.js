import { combineReducers } from 'redux';
import { SIGNIN, ADD_MESSAGE } from './actions';

function signin(state = '', action) {
    switch (action.type) {
        case SIGNIN:
        return action.username;
        default:
        return state;
    }
}

function messages(state = [], action) {
    switch (action.type) {
        case ADD_MESSAGE:
        return [...state, action.message];
        default:
        return state;
    }
}

const chatApp = combineReducers({
    username: signin,
    messages
});

export default chatApp;
