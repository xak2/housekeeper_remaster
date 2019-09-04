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
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import moment from 'moment'
import { Stack } from 'office-ui-fabric-react'
import { ActivityItem, Link, mergeStyleSets } from 'office-ui-fabric-react'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { TestImages } from '@uifabric/example-data'

export class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.selection = new Selection({
            onSelectionChanged: () => { this.props.setSelectedCustomersAction(this.getSelectionIds()) }
        })
        const columns = [
            { key: 'id', name: 'ID', fieldName: 'id', minWidth: 10, maxWidth: 50, isResizable: false },
            { key: 'name', name: 'Name', fieldName: 'name', minWidth: 50, maxWidth: 200, isResizable: true, isSorted: true, isSortedDescending: false, onColumnClick: this.onColumnClick },
            { key: 'mail', name: 'Mail', fieldName: 'mail', minWidth: 50, maxWidth: 200, isResizable: true },
            { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 800, isResizable: true, onColumnClick: this.onColumnClick },
            { key: 'date_added', name: 'Date added', fieldName: 'date_added', minWidth: 100, maxWidth: 100, isResizable: true, onColumnClick: this.onColumnClick },
            { key: 'date_modified', name: 'Last changes', fieldName: 'date_modified', minWidth: 100, maxWidth: 100, isResizable: true, onColumnClick: this.onColumnClick }
        ]
        this.state = { columns: columns, hideDialog: true, currentCustomer: [] }
    }
    // Component global controls
    componentDidMount() { this.props.loadCustomersAction() }
    componentDidUpdate() { this.selection.setAllSelected(false) }
    // Dialog controls
    onItemInvoked = (dialog) => { this.showDialog(dialog) }
    showDialog = (customer) => { this.setState({ hideDialog: false, currentCustomer: customer }) }
    closeDialog = () => { this.setState({ hideDialog: true, currentCustomer: [] }) }
    handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }) }
    handleSubmit = () => {
        var self = this
    }
    // Table controls
    getSelectionIds() {
        const count = this.selection.getSelectedCount()
        const id = []
        if (count >= 1) {
            let i
            for (i = 0; i < count; i++) {
                id[i] = [(this.selection.getSelection()[i]).id, (this.selection.getSelection()[i]).name]
            }
            return id
        } else {
            return false
        }
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
        this.setState({ columns: newColumns })
    }
    render() {
        const { columns, hideDialog, currentCustomer } = this.state
        const stackTokens = { childrenGap: 10 }
        const stackBlocks = { root: { width: '48%' } }
        const classNames = mergeStyleSets({
            exampleRoot: {
                marginTop: '10px'
            },
            nameText: {
                fontWeight: 'bold'
            }
        })
        const options = [
            { key: 1, text: 'Just created' },
            { key: 2, text: 'Made deposit 300€' },
            { key: 3, text: 'Got quotation' },
            { key: 3, text: 'Awaiting TDP-1' }
        ]
        const activityItemExamples = {
            key: 1,
            activityDescription: [
                <Link
                    key={1}
                    className={classNames.nameText}
                    onClick={() => {
                        alert('A name was clicked.');
                    }}
                >
                    Jack Howden
                </Link>,
                <span key={2}> renamed </span>,
                <span key={3} className={classNames.nameText}>
                    DocumentTitle.docx
                </span>
            ],
            activityPersonas: [{ imageUrl: TestImages.personaMale }],
            comments: 'Hello, this is the text of my basic comment!',
            timeStamp: '23m ago'
        }

        return (
            <Fabric>
                <Dialog hidden={hideDialog} onDismiss={this.closeDialog} dialogContentProps={{ type: DialogType.normal, title: currentCustomer.name }} minWidth='500px' modalProps={{ isBlocking: false }}>
                    <Stack>
                        <Stack horizontal disableShrink tokens={stackTokens}>
                            <Stack.Item align="end" styles={stackBlocks}>
                                <span><TextField name="name" onChange={this.handleChange} label="Customer name" iconProps={{ iconName: 'UserOptional' }} /></span>
                            </Stack.Item>
                            <Stack.Item align="end" styles={stackBlocks}>
                                <TextField name="name" onChange={this.handleChange} label="Phone number" iconProps={{ iconName: 'Phone' }} />
                            </Stack.Item>
                        </Stack>
                        <Stack horizontal disableShrink tokens={stackTokens}>
                            <Stack.Item align="end" styles={stackBlocks}>
                                <TextField name="name" onChange={this.handleChange} label="Mail" iconProps={{ iconName: 'Mail' }} />
                            </Stack.Item>
                            <Stack.Item align="end" styles={stackBlocks}>
                                <Dropdown placeholder="Select an option" label="Update status"  iconProps={{ iconName: 'Step' }} options={options} />
                            </Stack.Item>
                        </Stack>
                        <Stack horizontal disableShrink tokens={stackTokens}>
                            <ActivityItem {...activityItemExamples} key={activityItemExamples.key} className={classNames.exampleRoot} />
                        </Stack>
                    </Stack>
                    <DialogFooter>
                        <PrimaryButton onClick={this.handleSubmit} iconProps={{ iconName: 'Save' }} text="Save" />
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
// Functions
function renderItemColumn(item, index, column) {
    const fieldContent = item[column.fieldName]
    switch (column.key) {
        case 'name': return <span className={mergeStyles({ fontWeight: 'bold' })}>{fieldContent}</span>
        case 'mail': {
            let mailTo = 'mailto: ' + fieldContent
            return <Link href={mailTo}>{fieldContent}</Link>
        }
        case 'date_added': return <span>{moment.unix(fieldContent).format("DD.MM.YYYY H:m")}</span>
        case 'date_modified': return <span>{moment.unix(fieldContent).format("DD.MM.YYYY H:m")}</span>
        default: return <span>{fieldContent}</span>
    }
}
function copyAndSort(props, columnKey, isSortedDescending) {
    const key = columnKey
    const items = props.customers
    let newItems
    newItems = items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1))
    props.sortCustomersAction(newItems)
}
// Redux controls
const mapStateToProps = store => {
    return { customers: store.customersReducer.customers }
}
const mapDispatchToProps = dispatch => {
    return {
        loadCustomersAction: () => dispatch(loadCustomers()),
        sortCustomersAction: (customers) => dispatch(sortCustomers(customers)),
        setSelectedCustomersAction: (selected) => dispatch(setSelectedCustomers(selected))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerList))