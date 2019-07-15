import React, { Component } from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { ActionButton, Stack, Text } from 'office-ui-fabric-react'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { signIn } from '../actions'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom'

class SignIn extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { login: '', password: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        const form = { login: this.state.login, password: this.state.password }
        this.props.signInAction(form)
    }

    keyPressed = e => {
        const form = { login: this.state.login, password: this.state.password }
        if (e.key === "Enter") {
            this.props.signInAction(form)
        }
    }

    render() {
        const { location, user } = this.props
        if (location.pathname === '/signin' && user.authenticated === true) {
            return <Redirect to="/" />
        }
        const ErrorBar = (
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                    {user.error_message}
                </MessageBar>
            </Stack>
        )
        return (
            <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={{ root: { width: '350px', margin: '0 auto', textAlign: 'center', color: '#605e5c' } }} tokens={{ childrenGap: 15 }}>
                <Text variant="xLarge">Enter your authentication data</Text>
                {user.error ? ErrorBar : ''}
                <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                    <TextField iconProps={{ iconName: 'Contact' }} placeholder="Login" name="login" value={this.state.login} onChange={this.handleChange} />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                    <TextField iconProps={{ iconName: 'PasswordField' }} type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} onKeyPress={this.keyPressed} />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                    <PrimaryButton text="Sign in" onClick={this.handleSubmit} name="submit" />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                    <ActionButton iconProps={{ iconName: 'Unlock' }}>Forgot password</ActionButton>
                </Stack>
            </Stack>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInAction: form => dispatch(signIn(form)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignIn))