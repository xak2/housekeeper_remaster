import React from 'react'
import { useParams } from "react-router-dom";

function CustomerId() {
    let { customerId } = useParams();
    return customerId;
  }

class Customer extends React.Component {
    render() {
        return CustomerId()
    }
}

export default Customer