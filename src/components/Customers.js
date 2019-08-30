import React, { Component } from 'react'
import CommandBar from './Customers/CommandBar'
import CustomerList from './Customers/CustomerList.js'
import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'

const axiosWithProgress = axios.create()
const axiosWithoutProgress = axios.create()

loadProgressBar({}, axiosWithProgress)

class Customers extends Component {
    render() {
        return (
            <div>
                <CommandBar />
                <CustomerList />
            </div>
        )
    }
}

export default Customers