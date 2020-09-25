const { TestScheduler } = require("jest");
const axios = require('axios');

jest.mock('axios');

test('returns timestamp from reddit API', async () => {
    axios.get.mockResolvedValue({
        data: [
            {id: 1, title: 'test', created: 1600903340},
            {id: 2, title: 'test1', created: 1600902240},
        ]
    });
    const res = await axios.get('https://test.com/r/news.json');
    const date = await res.data[0].created;
    expect(date).toEqual(1600903340);
});

test('returns name of first group', async () => {
    axios.get.mockResolvedValue({
        data: [
            {id: 1, name: 'test'},
            {id: 2, name: 'test1'},
        ]
    });
    const res = await axios.get('https://test.com/groups/1');
    const title = await res.data[0].name;
    expect(title).toEqual('test');
});

test('returns user json resource', async () => {
    axios.get.mockResolvedValue({
        data: [
            {id: 1, name: 'Ryan', email: 'ryan@test.com'},
            {id: 2, name: 'Alice', email: 'alicen@test.com'},
        ]
    });
    const res = await axios.get('https://test.com/users/2');
    const user = await res.data[1];
    expect(user).toEqual({id: 2, name: 'Alice', email: 'alicen@test.com'});
});

test('returns status after creating post', async () => {
    axios.post.mockResolvedValue({
        data: 'Created!', status: 201
    });
    const res = await axios.post('https://test.com/posts');
    expect(res.status).toEqual(201);
});

test('returns error from creating post', async () => {
    axios.post.mockRejectedValue({
        'error': 'Not Authorized'
    });
    try {
        await axios.post('https://test.com/posts');
    } catch(err) {
        expect(err).toEqual({'error': 'Not Authorized'});
    }
});
