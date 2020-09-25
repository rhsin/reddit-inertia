import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    users: [],
    groups: [],
    user: {},
    render: false
};

function reducer(state = initialState, action) {
    console.log('reducer', state, action);

    switch(action.type) {
        case 'FETCH_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'FETCH_GROUPS':
            return {
                ...state,
                groups: action.groups
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'RENDER':
            return {
                ...state,
                render: !state.render
            };
        default:
            return state;
    }
}

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
  
  