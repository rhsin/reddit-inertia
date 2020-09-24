const { TestScheduler } = require("jest");
const axios = require('axios');

jest.mock('axios');


async function fetchPost() {
    const res = await axios.get('https://reddit.com/r/news.json');
    return res.data[0].created;
}

it('returns timestamp from reddit API', async () => {
    axios.get.mockResolvedValue({
        data: [
            {id: 1, title: 'test', created: 1600903340},
            {id: 2, title: 'test1', created: 1600902240},
        ]
    });
    const date = await fetchPost();
    expect(date).toEqual(1600903340);
});


it('returns name of first group', () => {
    axios.get.mockResolvedValue({
        data: [
            {id: 1, name: 'test'},
            {id: 2, name: 'test1'},
        ]
    });
    axios.get('https://localhost.com/groups/1')
    .then(response => response.data[0].name)
    .then(title => expect(title).toEqual('test'));
});


function round(number) {
    return Math.round(number/1000);
}
test('can round subscriber count', () => {
    expect(round(200111)).toEqual(200);
});

function getDate(time) {
    const date = new Date(time * 1000);
    return date.toUTCString().slice(0, -7);
}
test('convert timestamp to date string', () => {
    expect(getDate(1600903340)).toEqual('Wed, 23 Sep 2020 23:22');
});