import React from 'react';
import { Provider } from 'react-redux';
import store from './Components/redux/store';
import Dashboard from './Components/Dashboard';

function Home(props) {
    return (
        <Provider store={store}>
            <Dashboard posts={props.posts.data}/>
        </Provider>
    );
}

export default Home;
