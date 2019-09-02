import * as React from 'react'
import { Stack } from 'office-ui-fabric-react'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { loadCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const axiosWithProgress = axios.create()
loadProgressBar({}, axiosWithProgress)

export class DialogAddCustomer extends React.Component {

    constructor(props) {
        super(props)
        this.state = { hideDialog: true, name: '', mail: '', error: undefined }
    }

    showDialog = () => {
        this.setState({ hideDialog: false })
    }

    closeDialog = () => {
        this.setState({ hideDialog: true })
    }

    handleChange = (event) => {
        const target = event.target
        const fieldValue = target.value
        const fieldName = target.name
        if (fieldName === 'name') this.setState({ name: fieldValue })
        else if (fieldName === 'mail') this.setState({ mail: fieldValue })
    }

    handleSubmit = () => {
        var self = this
        axiosWithProgress.post(
            'http://localhost/housekeeper_remaster/php/AddCustomer.php',
            { name: this.state.name, mail: this.state.mail },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
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
        const ErrorBar = (
            <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="center">
                <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
                    {error}
                </MessageBar>
            </Stack>
        )

        return (
            <CommandBarButton iconProps={{ iconName: 'AddFriend' }} text={'Add customer'} onClick={this.showDialog}>
                <Dialog
                    hidden={hideDialog}
                    onDismiss={this.closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Add new customer'
                    }}
                    modalProps={{
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } }
                    }}
                >
                    {error ? ErrorBar : ''}
                    <TextField name="name" onChange={this.handleChange} label="Customer or company name" iconProps={{ iconName: 'UserOptional' }} />
                    <TextField name="mail" onChange={this.handleChange} label="Customer mail" iconProps={{ iconName: 'Mail' }} />
                    <DialogFooter>
                        <PrimaryButton onClick={this.handleSubmit} iconProps={{ iconName: 'Save' }} text="Add" />
                        <DefaultButton onClick={this.closeDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </CommandBarButton>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCustomersAction: () => dispatch(loadCustomers())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(DialogAddCustomer))