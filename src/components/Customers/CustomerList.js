import * as React from 'react'
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList'
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { loadCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class CustomerList extends React.Component {

    constructor(props) {
        super(props)
        
        this.selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this.getSelectionDetails() })
        })

        this._columns = [
            { key: 'column0', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: false },
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Mail', fieldName: 'mail', minWidth: 100, maxWidth: 200, isResizable: true }
        ]
        this.state = {
            items: this.props.customers,
            selectionDetails: this.getSelectionDetails()
        }
    }

    componentDidMount() {
        this.props.loadCustomersAction()
    }

    getSelectionDetails() {
        const selectionCount = this.selection.getSelectedCount()

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (this.selection.getSelection()[0]).name;
            default:
                return `${selectionCount} items selected`;
        }
    }

    onItemInvoked = item => {
        alert(`Item invoked: ${item.id}`);
    }

    render() {
        const { items, selectionDetails } = this.state
        return (
            <Fabric>
                <div>{selectionDetails}</div>
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={items}
                        columns={this._columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                        onItemInvoked={this.onItemInvoked}
                    />
                </MarqueeSelection>
            </Fabric>
        )
    }
}

const mapStateToProps = store => {
    return {
        customers: store.customersReducer.customers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCustomersAction: () => dispatch(loadCustomers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerList))