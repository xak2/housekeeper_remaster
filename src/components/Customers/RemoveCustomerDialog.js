import * as React from 'react'
import { Stack } from 'office-ui-fabric-react'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { loadCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const axiosWithProgress = axios.create()
loadProgressBar({}, axiosWithProgress)

export class DialogRemoveCustomer extends React.Component {

    constructor(props) {
        super(props)
        this.state = { hideDialog: true, password: '', error: undefined }
    }

    showDialog = () => { this.setState({ hideDialog: false }) }
    closeDialog = () => { this.setState({ hideDialog: true }) }
    handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }) }
    handleSubmit = () => {
        var self = this
        const { user, selectedCustomers } = this.props
        axiosWithProgress.post(
            'http://localhost/housekeeper_remaster/php/RemoveCustomers.php',
            { user_id: user.id, password: this.state.password, customer: selectedCustomers },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
            console.log(response)
            if (response.data.error) {
                self.setState({ error: response.data.error.join(' ') })
            } else self.setState({ error: undefined })
            if (response.data.success === true) {
                self.setState({ hideDialog: true })
                this.props.loadCustomersAction()
            }
        })
    }

    render() {
        const { hideDialog, error } = this.state
        const { selectedCustomers } = this.props
        const ErrorBar = (
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
                    {error}
                </MessageBar>
            </Stack>
        )
        let customerNames = []
        if (selectedCustomers !== false) {
            selectedCustomers.map((item) => customerNames.push(item[1]))
        }
        return (
            <CommandBarButton iconProps={{ iconName: 'UserRemove' }} text={selectedCustomers.length >= 1 ? `Remove customers (${selectedCustomers.length})` : 'Remove customers'} onClick={this.showDialog} disabled={selectedCustomers === false ? true : false}>
                <Dialog
                    hidden={hideDialog}
                    onDismiss={this.closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Remove customer'
                    }}
                    modalProps={{
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } }
                    }}
                >
                    {error ? ErrorBar : ''}
                    <Text variant='mediumPlus'>Remove customers ({customerNames.join(', ')})?</Text>
                    <TextField name="password" type="password" placeholder="Password" 
                    onChange={this.handleChange} label="Confirm with password" iconProps={{ iconName: 'PasswordField' }} />
                    <DialogFooter>
                        <PrimaryButton onClick={this.handleSubmit} iconProps={{ iconName: 'Delete' }} text="Remove" />
                        <DefaultButton onClick={this.closeDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </CommandBarButton>
        )
    }
}

const mapStateToProps = store => {
    return {
        selectedCustomers: store.customersReducer.selected,
        user: store.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCustomersAction: () => dispatch(loadCustomers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DialogRemoveCustomer))