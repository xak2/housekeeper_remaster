import * as React from 'react'
import { CommandBarButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet'
import { DialogBasicExample } from './asd'

function onClickItem(key: string) {
  console.log(`Clicked: ${key}`)
  return <DialogBasicExample />
}

export default class CommandBar extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <OverflowSet
        items={[
          {
            key: 'search',
            onRender: () => {
              return <SearchBox placeholder="Search" styles={{ root: { marginBottom: 0, width: 250 } }} />
            }
          },
          {
            key: 'newItem',
            name: 'New customer',
            icon: 'Add'
          },
          {
            key: 'filter',
            name: 'Filter',
            icon: 'FilterSettings',
            subMenuProps: {
              items: [
                {
                  key: 'allCustomers',
                  name: 'All customers',
                  icon: 'AllApps'
                },
                {
                  key: 'hasUnfinishedProjects',
                  name: 'Has unfinished projects',
                  icon: 'MultiSelect'
                },
                {
                  key: 'calendarEvent',
                  name: 'Added in last month',
                  icon: 'Calendar'
                }
              ]
            }
          }
        ]}
        onRenderOverflowButton={this._onRenderOverflowButton}
        onRenderItem={this._onRenderItem}
      />
    )
  }

  private _onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
    if (item.onRender) {
      return item.onRender(item)
    }
    return <CommandBarButton iconProps={{ iconName: item.icon }} menuProps={item.subMenuProps} text={item.name} onClick={() => onClickItem(item.key)} />
  }

  private _onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
    const buttonStyles: Partial<IButtonStyles> = {
      root: {
        minWidth: 0,
        padding: '0 4px',
        alignSelf: 'stretch',
        height: 'auto'
      }
    }
    return <CommandBarButton styles={buttonStyles} menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems! }} />
  }

}