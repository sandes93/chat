/*
 * action types
 */

export const SIGNIN = 'SIGNIN';
export const ADD_MESSAGE = 'ADD_MESSAGE';

/*
 * action creators
 */

export function signin(username) {
    return { type: SIGNIN, username };
}

export function addMessage(message) {
    return { type: ADD_MESSAGE, message };
}
