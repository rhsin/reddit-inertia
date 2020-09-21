import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    users: [],
    groups: []
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
        default:
            return state;
    }
  }

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
  
  