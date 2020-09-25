const { TestScheduler } = require("jest");

test('create action to set current user', () => {
    const setUser = (account) => ({type: 'SET_USER', user: account});
    account = {id: 1, name: 'Ryan', email: 'ryan@test.com'};
    action = {type: 'SET_USER', user: account};
    expect(setUser(account)).toEqual(action); 
});

test('create action to re-render component', () => {
    const refresh = () => ({type: 'RENDER'});
    action = {type: 'RENDER'};
    expect(refresh()).toEqual(action); 
});

test('can round subscriber count', () => {
    const round = (n) => Math.round(n/1000);
    expect(round(200111)).toEqual(200);
});

test('convert timestamp to date string', () => {
    const getDate = (time) => {
        const date = new Date(time * 1000);
        return date.toUTCString().slice(0, -7);
    }
    expect(getDate(1600903340)).toEqual('Wed, 23 Sep 2020 23:22');
});