import React from 'react';
import { connect } from 'react-redux';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

function UserPanel(props) {
    const { users, user } = props;

    return (
        <>
            <div>
                {user.name}'s Dashboard
            </div>
            <Tabs
                variant='enclosed-colored'
                variantColor='blue'
                size='sm'
            >
                <TabList>
                    {users.map(item => 
                        <Tab key={item.id}>
                            {item.name}
                        </Tab>
                    )}
                </TabList>
                <TabPanels>
                    {users.map(item => 
                        <TabPanel key={item.id}>
                            <div>{item.email}</div>
                            {item.groups.map(i => 
                                <div key={i.id}>
                                    {i.name}
                                </div>
                            )}
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
        </>
    );
}

function mapStateToProps(state) {
    return {
        users: state.users,
        user: state.user
    };
}

export default connect(mapStateToProps)(UserPanel);