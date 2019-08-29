import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

export default class DetailsListBasicExample extends React.Component {

    constructor(props) {
        super(props);

        // Populate with items for demos.
        this._allItems = this.props.customers;

        console.log(this.props.customers)

        this._columns = [
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true }
        ];

        this.state = {
            items: this._allItems
        };
    }

    render() {
        const { items } = this.state;

        return (
            <Fabric>
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
                        onItemInvoked={this._onItemInvoked}
                    />
                </MarqueeSelection>
            </Fabric>
        );
    }
}