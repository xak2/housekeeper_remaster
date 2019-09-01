import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { loadCustomers, sortCustomers, setSelectedCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class CustomerList extends React.Component {

    constructor(props) {
        super(props)

        this.selection = new Selection({
            onSelectionChanged: () => {
                this.props.setSelectedCustomersAction(this.getSelectionIds())
            }
        })

        const columns = [
            { key: 'column0', name: 'ID', fieldName: 'id', minWidth: 30, maxWidth: 50, isResizable: false },
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true, isSorted: true, isSortedDescending: false, onColumnClick: this.onColumnClick },
            { key: 'column2', name: 'Mail', fieldName: 'mail', minWidth: 100, maxWidth: 200, isResizable: true }
        ]

        this.state = {
            columns: columns
        }
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
        alert(`Item invoked: ${item.id}`);
    }

    onColumnClick = (e, column) => {
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

    render() {
        const { columns } = this.state
        return (
            <Fabric>
                <MarqueeSelection>
                    <DetailsList
                        items={this.props.customers}
                        columns={columns}
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
        selectedCustomers: store.customersReducer.selected
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