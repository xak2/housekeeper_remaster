import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { loadCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from "react-router"

export class DetailsListBasicExample extends React.Component {

    constructor(props) {
        super(props);
        this._columns = [
            { key: 'column0', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: false },
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Mail', fieldName: 'mail', minWidth: 100, maxWidth: 200, isResizable: true }
        ]
    }

    componentDidMount() {
        this.props.loadCustomersAction()
    }

    render() {
        return (
            <Fabric>
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={this.props.customers}
                        columns={this._columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                        onItemInvoked={this._onItemInvoked}
                    />
                </MarqueeSelection>
            </Fabric>
        );
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DetailsListBasicExample))