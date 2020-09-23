import React from 'react';
import { Provider } from 'react-redux';
import store from './Components/redux/store';
import Dashboard from './Components/Dashboard';
import { ThemeProvider } from '@chakra-ui/core'

function Home(props) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Dashboard
                    account={props.account.data}
                    posts={props.posts.data}
                />
            </ThemeProvider>
        </Provider>
    );
}

export default Home;
