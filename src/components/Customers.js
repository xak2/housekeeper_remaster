import React, { Component } from 'react'
import CommandBar from './Customers/CommandBar'
import CustomerList from './Customers/CustomerList.js'
import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'

const axiosWithProgress = axios.create()
const axiosWithoutProgress = axios.create()

loadProgressBar({}, axiosWithProgress)

class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            updated: false
        }
    }

    loadCustomers() {
        setTimeout(() => {
            axiosWithoutProgress.get(`http://localhost/housekeeper_remaster/php/LoadCustomers.php`)
                .then(r => {
                    const customers = r.data.customers
                    if (this.state.customers.length !== customers.length) {
                        this.setState({ customers: customers })
                        this.setState({ updated: true })
                    } else {
                        this.setState({ updated: false })
                    }
                })
        }, 1000)
    }

    componentDidMount() {
        axiosWithProgress.get(`http://localhost/housekeeper_remaster/php/LoadCustomers.php`)
            .then(r => {
                const customers = r.data.customers
                this.setState({ customers: customers })
            })
    }

    render() {
        this.loadCustomers()
        return (
            <div>
                <CommandBar />
                <CustomerList customers={this.state.customers} />
            </div>
        )
    }
}

export default Customers