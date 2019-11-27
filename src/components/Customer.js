import React, { Component } from 'react'
import { useParams } from "react-router-dom";

function CustomerId() {
    let { customerId } = useParams();
    return customerId;
  }

class Customer extends Component {
    render() {
        return <h1>Customer <CustomerId /></h1>
    }
}

export default Customer