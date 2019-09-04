import * as React from 'react'
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet'
import DialogAddCustomer from './AddCustomerDialog.js'
import DialogRemoveCustomer from './RemoveCustomerDialog.js'
import { loadCustomers, filterCustomers } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class CommandBar extends React.Component {
    render() {
        return (
            <OverflowSet
                items={[
                    {
                        key: 'search',
                        onRender: () => { return <SearchBox placeholder="Search" onChange={this.onFilter} styles={{ root: { marginBottom: 0, width: 200 } }} /> }
                    },
                    { key: 'addCustomer' },
                    { key: 'removeCustomer' }
                ]}

                onRenderOverflowButton={this._onRenderOverflowButton}
                onRenderItem={this._onRenderItem}
            />
        )
    }

    onFilter = (e, search) => {
        if (search) {
            this.props.filterCustomersAction(this.props.staticCustomers.filter(i => i.name.toLowerCase().indexOf(search) > -1))
        } else {
            this.props.filterCustomersAction(this.props.staticCustomers)
        }
    }

    _onRenderItem = (item) => {
        if (item.onRender) {
            return item.onRender(item);
        }
        if (item.key === 'addCustomer') return <DialogAddCustomer />
        else if (item.key === 'removeCustomer') return <DialogRemoveCustomer />
        else return <CommandBarButton iconProps={{ iconName: item.icon }} menuProps={item.subMenuProps} text={item.name} />
    }

    _onRenderOverflowButton = (overflowItems) => {
        const buttonStyles = {
            root: {
                minWidth: 0,
                padding: '0 4px',
                alignSelf: 'stretch',
                height: 'auto'
            }
        }
        return <CommandBarButton styles={buttonStyles} menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems }} />
    }
}

const mapStateToProps = store => {
    return {
        customers: store.customersReducer.customers,
        staticCustomers: store.customersReducer.staticCustomers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCustomersAction: () => dispatch(loadCustomers()),
        filterCustomersAction: (customers) => dispatch(filterCustomers(customers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommandBar))