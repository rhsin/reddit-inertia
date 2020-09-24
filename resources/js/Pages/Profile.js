// The account and posts props are passed from Laravel directly through InertiaJS (render method).
// Still fetched data through redux-thunk for more dynamic rendering.

import React from 'react';
import { Provider } from 'react-redux';
import store from './Components/redux/store';
import ProfileDash from './Components/ProfileDash';
import { ThemeProvider } from '@chakra-ui/core';

function Profile(props) {
    return (
        <Provider store={store}>
            <ThemeProvider> 
                <ProfileDash account={props.account.data}/>
            </ThemeProvider>
        </Provider>
    );
}

export default Profile;
