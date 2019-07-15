import React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { ActionButton, Stack, Text } from 'office-ui-fabric-react'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { signIn } from '../actions'
import { connect } from 'react-redux'

const SignIn = ({ dispatch }) => {
    let user = [];
    const handleChange = (value) => {
        if (value.target.name === 'login') {
            user['login'] = value.target.defaultValue;
        } else if (value.target.name === 'password') {
            user['password'] = value.target.defaultValue;
        } else {
            console.log('Response from component:');
            console.log(user);
            dispatch(signIn('authenticated'));
        }
    }

    return (
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={{ root: { width: '350px', margin: '0 auto', textAlign: 'center', color: '#605e5c' } }} tokens={{ childrenGap: 15 }}>
            <Text variant="xLarge">Please enter your authentication data</Text>
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <TextField iconProps={{ iconName: 'Contact' }} placeholder="Login" name="login" onChange={handleChange} />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <TextField iconProps={{ iconName: 'PasswordField' }} type="password" placeholder="Password" name="password" onChange={handleChange} />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <PrimaryButton text="Sign in" onClick={handleChange} name="submit" />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <ActionButton iconProps={{ iconName: 'Lock' }}>Forgot password</ActionButton>
            </Stack>
        </Stack>
    )
}

export default connect()(SignIn)