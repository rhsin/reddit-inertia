const { TestScheduler } = require("jest");

const initialState = {
    users: [],
    groups: [],
    user: {},
    render: false
};

function reducer(state = initialState, action) {
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

describe('reducer', () => {
    test('return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('handle FETCH_USERS', () => {
        expect(reducer({}, {
            type: 'FETCH_USERS',
            users: [
                {id: 1, name: 'Ryan'},
                {id: 2, name: 'Alice'}
            ] 
        }))
        .toEqual({
            users: [
                {id: 1, name: 'Ryan'},
                {id: 2, name: 'Alice'}
            ] 
        });
    });

    test('handle FETCH_GROUPS', () => {
        expect(reducer({}, {
            type: 'FETCH_GROUPS',
            groups: [
                {id: 1, name: 'PS4'},
                {id: 1, name: 'WebDev'}
            ] 
        }))
        .toEqual({
            groups: [
                {id: 1, name: 'PS4'},
                {id: 1, name: 'WebDev'}
            ] 
        });
    });

    test('handle SET_USER', () => {
        expect(reducer({}, {
            type: 'SET_USER',
            user: {id: 1, name: 'Ryan'} 
        }))
        .toEqual({
            user: {id: 1, name: 'Ryan'}
        });
    });
    
    test('handle RENDER', () => {
        expect(reducer({}, {type: 'RENDER'}))
        .toEqual({render: true});
    });
});

