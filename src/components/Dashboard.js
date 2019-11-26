import React, { Component } from 'react'
import { signOut } from '../actions'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import PropTypes from "prop-types";
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Stack, DefaultPalette, mergeStyleSets } from 'office-ui-fabric-react';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths'
import Home from './Home'
import Customers from './Customers'
import AccountSettings from './AccountSettings'
import User from './User'

class Navigation extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    onLinkClick = (e, item) => {
        const { history } = this.props
        if (item.key === 'SignOut') {
            this.props.signOutAction()
        } else {
            history.push(item.path)
        }
    }

    render = () => (
        <Nav
            onLinkClick={this.onLinkClick}
            styles={{
                root: {
                    width: 250,
                    boxSizing: 'border-box',
                    overflowY: 'auto'
                }
            }}
            groups={[
                {
                    links: [
                        { key: 'Dashboard', name: 'Dashboard', path: '/dashboard', icon: 'ViewDashboard' },
                        { key: 'Customers', name: 'Customers', path: '/dashboard/customers', icon: 'People' },
                        { key: 'ProjectProgress', name: 'Project progress', path: '/dashboard/progress', icon: 'TimelineProgress' },
                        { key: 'Tasks', name: 'Tasks (7)', path: '/dashboard/tasks', icon: 'TaskGroup' },
                        { key: 'Schedule', name: 'Schedule', path: '/dashboard/schedule', icon: 'Calendar' },
                        { key: 'Storehouse', name: 'Storehouse', path: '/dashboard/storehouse', icon: 'Quantity' },
                        { key: 'Settings', name: 'Account settings', path: '/dashboard/account', icon: 'PlayerSettings' },
                        { key: 'SignOut', name: 'Sign out', icon: 'Lock' }
                    ]
                }
            ]}
        />
    )
}

const NavigationWR = withRouter(Navigation)

export class Dashboard extends Component {
    render() {
        const { user } = this.props
        const styles = mergeStyleSets({
            root: { background: DefaultPalette.white },
            leftBar: { background: DefaultPalette.white, padding: 5 },
            item: { background: DefaultPalette.white, padding: 10, width: '1200px', boxShadow: Depths.depth8 }
        });
        const tokens = {
            fiveGapStack: { childrenGap: 5, padding: 10 },
            tenGapStack: { childrenGap: 10 }
        };
        return (
            <Stack
                horizontal
                disableShrink
                tokens={tokens.fiveGapStack}
                className={styles.root}
            >
                <Stack.Item align="auto" className={styles.leftBar}>
                    <User {...user} />
                    <NavigationWR {...this.props} />
                </Stack.Item>
                <Stack.Item align="auto" className={styles.item}>
                    <Route exact path="/dashboard" component={Home} />
                    <Route path="/dashboard/customers" component={Customers} />
                    <Route path="/dashboard/customer/" component={Customers} />
                    <Route path="/dashboard/account" component={AccountSettings} />
                </Stack.Item>
            </Stack>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOutAction: f => dispatch(signOut(f)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)