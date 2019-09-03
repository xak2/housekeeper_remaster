import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { loadCustomers, sortCustomers, setSelectedCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'office-ui-fabric-react/lib/Link'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import moment from 'moment'

export class CustomerList extends React.Component {

    constructor(props) {
        super(props)

        this.selection = new Selection({
            onSelectionChanged: () => {
                this.props.setSelectedCustomersAction(this.getSelectionIds())
            }
        })

        const columns = [
            { key: 'id', name: 'ID', fieldName: 'id', minWidth: 10, maxWidth: 50, isResizable: false },
            { key: 'name', name: 'Name', fieldName: 'name', minWidth: 50, maxWidth: 200, isResizable: true, isSorted: true, isSortedDescending: false, onColumnClick: this.onColumnClick },
            { key: 'mail', name: 'Mail', fieldName: 'mail', minWidth: 50, maxWidth: 200, isResizable: true },
            { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 800, isResizable: true, onColumnClick: this.onColumnClick },
            { key: 'date_added', name: 'Date added', fieldName: 'date_added', minWidth: 100, maxWidth: 100, isResizable: true, onColumnClick: this.onColumnClick },
            { key: 'date_modified', name: 'Last changes', fieldName: 'date_modified', minWidth: 100, maxWidth: 100, isResizable: true, onColumnClick: this.onColumnClick }
        ]

        this.state = {
            columns: columns,
            hideDialog: true,
            currentCustomer: []
        }
    }

    showDialog = customer => {
        this.setState({ hideDialog: false, currentCustomer: customer })
    }

    closeDialog = () => {
        this.setState({ hideDialog: true, currentCustomer: [] })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value)
    }

    handleSubmit = () => {
        var self = this
    }

    componentDidMount() {
        this.props.loadCustomersAction()
    }

    getSelectionIds() {
        const selectionCount = this.selection.getSelectedCount()
        const customersId = []
        if (selectionCount >= 1) {
            let i
            for (i = 0; i < selectionCount; i++) {
                customersId[i] = [(this.selection.getSelection()[i]).id, (this.selection.getSelection()[i]).name]
            }
            return customersId
        } else {
            return false
        }
    }

    onItemInvoked = item => {
        this.showDialog(item)
    }

    onColumnClick = (e, column) => {
        this.selection.setAllSelected(false)
        const { columns } = this.state
        const newColumns = columns.slice()
        const currColumn = newColumns.filter(currCol => column.key === currCol.key)[0]
        newColumns.forEach((newCol) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending
                currColumn.isSorted = true
            } else {
                newCol.isSorted = false
                newCol.isSortedDescending = true
            }
        })
        copyAndSort(this.props, currColumn.fieldName, currColumn.isSortedDescending)
        this.setState({
            columns: newColumns
        })
    }

    resetSelection() {
        this.selection.setAllSelected(false)
    }

    componentDidUpdate() {
        this.selection.setAllSelected(false)
    }

    render() {
        const { columns, hideDialog, currentCustomer } = this.state
        return (
            <Fabric>
                <Dialog
                    hidden={hideDialog}
                    onDismiss={this.closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: currentCustomer.name
                    }}
                    modalProps={{
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } }
                    }}
                >
                    <TextField name="name" defaultValue={currentCustomer.name} onChange={this.handleChange} label="Customer or company name" iconProps={{ iconName: 'UserOptional' }} />
                    <TextField name="mail" defaultValue={currentCustomer.mail} onChange={this.handleChange} label="Customer mail" iconProps={{ iconName: 'Mail' }} />
                    <DialogFooter>
                        <PrimaryButton onClick={this.handleSubmit} iconProps={{ iconName: 'Save' }} text="Add" />
                        <DefaultButton onClick={this.closeDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
                <MarqueeSelection>
                    <DetailsList
                        items={this.props.customers}
                        columns={columns}
                        onRenderItemColumn={renderItemColumn}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={this.selection}
                        selectionPreservedOnEmptyClick={true}
                        enterModalSelectionOnTouch={true}
                        onItemInvoked={this.onItemInvoked}
                    />
                </MarqueeSelection>
            </Fabric>
        )
    }
}

function renderItemColumn(item, index, column) {
    const fieldContent = item[column.fieldName]
    switch (column.key) {
        case 'name':
            return <span className={mergeStyles({ fontWeight: 'bold' })}>{fieldContent}</span>
        case 'mail':
            return <Link href="mailto: fieldContent">{fieldContent}</Link>
        case 'date_added': {
            return <span>{moment.unix(fieldContent).format("DD.MM.YYYY H:m")}</span>
        }
        case 'date_modified': {
            return <span>{moment.unix(fieldContent).format("DD.MM.YYYY H:m")}</span>
        }
        default:
            return <span>{fieldContent}</span>
    }
}

function copyAndSort(props, columnKey, isSortedDescending) {
    const key = columnKey
    const items = props.customers
    let newItems
    newItems = items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1))
    props.sortCustomersAction(newItems)
}

const mapStateToProps = store => {
    return {
        customers: store.customersReducer.customers,
        filter: store.customersReducer.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCustomersAction: () => dispatch(loadCustomers()),
        sortCustomersAction: (customers) => dispatch(sortCustomers(customers)),
        setSelectedCustomersAction: (selected) => dispatch(setSelectedCustomers(selected))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerList))