import * as React from 'react';
import { CommandBarButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { DialogAddCustomer } from './AddCustomerDialog';

export default class CommandBar extends React.PureComponent {
    public render(): JSX.Element {
        return (
            <OverflowSet
                items={[
                    {
                        key: 'search',
                        onRender: () => { return <SearchBox placeholder="Search" styles={{ root: { marginBottom: 0, width: 200 } }} /> }
                    },
                    { key: 'addCustomer' }
                ]}

                onRenderOverflowButton={this._onRenderOverflowButton}
                onRenderItem={this._onRenderItem}
            />
        )
    }

    private _onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
        if (item.onRender) {
            return item.onRender(item);
        }
        if (item.key === 'addCustomer') return <DialogAddCustomer />
        else return <CommandBarButton iconProps={{ iconName: item.icon }} menuProps={item.subMenuProps} text={item.name} />;
    };

    private _onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
        const buttonStyles: Partial<IButtonStyles> = {
            root: {
                minWidth: 0,
                padding: '0 4px',
                alignSelf: 'stretch',
                height: 'auto'
            }
        };
        return <CommandBarButton styles={buttonStyles} menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems! }} />;
    };
}