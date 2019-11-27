import React, { Component } from 'react'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { ActivityItem, Link, mergeStyleSets } from 'office-ui-fabric-react'

const classNames = mergeStyleSets({
    exampleRoot: {
        marginTop: '10px'
    },
    nameText: {
        fontWeight: 'bold'
    }
})

const activityItemExamples = {
    key: 1,
    activityDescription: [
        <Link
            key={1}
            className={classNames.nameText}
            onClick={() => {
                alert('A name was clicked.');
            }}
        >
            Vyacheslav Stefanovich
        </Link>,
        <span key={2}> added customer </span>,
        <span key={3} className={classNames.nameText}>Customer name</span>
    ],
    activityPersonas: [{ imageUrl: 'http://localhost/media/TestPersonaImage.png' }],
    //comments: 'Hello, this is the text of my basic comment!',
    timeStamp: '23m ago'
}

const rowStyle = {
    padding: '0px 5px 10px 5px'
}

class Schedule extends Component {
    render() {
        return (
            <div>
                <Row gutter={10} style={rowStyle}>
                    <Col span={12}><Text variant="xLarge" nowrap block>Customer Name</Text></Col>
                </Row>
                <Row gutter={10} style={rowStyle}>
                    <Col span={8}><Text variant="large" nowrap block>Customer data</Text></Col>
                    <Col span={4}><Text variant="large" nowrap block>Change history</Text></Col>
                </Row>
                <Row gutter={20} style={rowStyle}>
                    <Col span={4}>
                        <TextField label="Customer or company name" readOnly defaultValue="Customer name" />
                        <TextField label="Customer address" readOnly defaultValue="P.O. Box 886 4118 Arcu St. Rolling Hills Georgia 92358" />
                    </Col>
                    <Col span={4}>
                        <TextField label="Phone number" readOnly defaultValue="+300 (900) 22244455" />
                        <TextField label="Email address" readOnly defaultValue="customer@company.com" />
                    </Col>
                    <Col span={4}>
                        <ActivityItem {...activityItemExamples} key={activityItemExamples.key} className={classNames.exampleRoot} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Schedule