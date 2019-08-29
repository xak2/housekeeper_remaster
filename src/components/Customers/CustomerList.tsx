import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px'
});

export interface IDetailsListBasicExampleItem {
    id: number
    name: string
}

export interface IDetailsListBasicExampleState {
    items: IDetailsListBasicExampleItem[];
    selectionDetails: {};
}

export default class DetailsListBasicExample extends React.Component<any, IDetailsListBasicExampleState> {
    private _selection: Selection;
    private _allItems: IDetailsListBasicExampleItem[];
    private _columns: IColumn[];

    constructor(props: {}) {
        super(props);

        const { customers } = this.props

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
        });

        // Populate with items for demos.
        this._allItems = customers;

        console.log(customers)

        this._columns = [
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true }
        ];

        this.state = {
            items: this._allItems,
            selectionDetails: this._getSelectionDetails()
        };
    }

    public render(): JSX.Element {
        const { items, selectionDetails } = this.state;

        return (
            <Fabric>
                <div className={exampleChildClass}>{selectionDetails}</div>
                <TextField
                    className={exampleChildClass}
                    label="Filter by name:"
                    styles={{ root: { maxWidth: '300px' } }}
                />
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

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).name;
            default:
                return `${selectionCount} items selected`;
        }
    }

    private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        this.setState({
            items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems
        });
    };

    private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
        alert(`Item invoked: ${item.name}`);
    };
}