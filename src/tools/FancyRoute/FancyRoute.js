import React from 'react'
import { Route } from 'react-router-dom'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { withRouter } from "react-router";

nprogress.configure({ showSpinner: true })

class FancyRoute extends React.Component {
    constructor(props) {
        super(props)
        nprogress.start()
    }
    componentDidMount() {
        nprogress.done()
    }
    render() {
        return (
            <Route {...this.props} />
        )
    }
}

export default withRouter(FancyRoute)