import React, { Component } from 'react'
import { ActionButton, Stack } from 'office-ui-fabric-react'
import { signOut } from '../actions'
import { connect } from 'react-redux'

class SignOut extends Component {
    handleSubmit = e => {
        this.props.signOutAction()
    }

    render() {
        return (
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <ActionButton iconProps={{ iconName: 'Lock' }} onClick={this.handleSubmit}>Sign out</ActionButton>
            </Stack>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOutAction: f => dispatch(signOut(f)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)