import React, { Component } from 'react'
import { Persona } from 'office-ui-fabric-react/lib/Persona'

export default class User extends Component {
    render() {
        return (
            <Persona secondaryText={this.props.type} text={this.props.name} />
        )
    }
}