import React from 'react'
import {
    DatePicker,
    DayOfWeek,
    ActionButton,
    CommandBar,
    Text,
    TextField,
    ActivityItem,
    Link,
    mergeStyleSets,
    Dropdown,
    DropdownMenuItemType
} from 'office-ui-fabric-react'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

export class CustomerProjectDatepicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstDayOfWeek: DayOfWeek.Sunday
        }
    }
    render() {
        const { firstDayOfWeek } = this.state
        const DayPickerStrings = {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            goToToday: 'Go to today',
            prevMonthAriaLabel: 'Go to previous month',
            nextMonthAriaLabel: 'Go to next month',
            prevYearAriaLabel: 'Go to previous year',
            nextYearAriaLabel: 'Go to next year',
            closeButtonAriaLabel: 'Close date picker'
        }
        return (
            <div className="docs-DatePickerExample">
                <DatePicker
                    label="Production start date"
                    firstDayOfWeek={firstDayOfWeek}
                    strings={DayPickerStrings}
                    placeholder="Select a date..."
                />
            </div>
        )
    }
    _onDropdownChange = (event, option) => {
        this.setState({
            firstDayOfWeek: (DayOfWeek)[option.key]
        })
    }
}

export class CustomerProjectDropdown extends React.Component {
    state = {
        selectedItem: undefined
    }
    render() {
        const { selectedItem } = this.state
        return (
            <Dropdown
                label="Controlled example"
                selectedKey={selectedItem ? selectedItem.key : undefined}
                onChange={this._onChange}
                placeholder="Select project"
                options={[
                    { key: 'new', text: 'New projects', itemType: DropdownMenuItemType.Header },
                    { key: 'cp_1', text: 'Customer project (House)' },
                    { key: 'cp_2', text: 'Customer project (Garage)' },
                    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
                    { key: 'inProduction', text: 'In production', itemType: DropdownMenuItemType.Header },
                    { key: 'cp_3', text: 'Customer vilage' },
                    { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
                    { key: 'finished', text: 'Finished projects', itemType: DropdownMenuItemType.Header },
                    { key: 'cp_4', text: 'Customer reference project 140m' },
                    { key: 'cp_5', text: 'Customer temporary building' }
                ]}
                styles={{ dropdown: { width: '100%' } }}
            />
        );
    }
    _onChange = (event, item) => {
        console.log(`Selection change: ${item.text} ${item.selected ? 'selected' : 'unselected'}`)
        this.setState({ selectedItem: item })
    }
}

export const CustomerDataCommandBar = () => {
    const _items = [
        {
            key: 'save',
            text: 'Save data',
            iconProps: { iconName: 'Save' }
        }
    ]
    return <CommandBar items={_items} styles={{ root: { padding: 0 } }} />
}

export class CustomerProjectCommandBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hideDialog: {
                newProject: true
            }
        }
    }
    showDialog = (val) => {
        this.setState({ hideDialog: { [val]: false } })
        console.log(this.state)
    }
    render() {
        const _items = [
            {
                key: 'newProject',
                text: 'New',
                iconProps: { iconName: 'NewTeamProject' },
                onClick: () => this.showDialog('newProject')
            },
            {
                key: 'removeProject',
                text: 'Remove',
                iconProps: { iconName: 'DictionaryRemove' }
            },
            {
                key: 'openPackinglist',
                text: 'Open packinglist',
                iconProps: { iconName: 'ClipboardListMirrored' }
            }
        ]
        return (
            <CommandBar
                items={_items}
                styles={{ root: { padding: 0 } }}
            />
        )
    }
}

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
const activityItemExamples2 = {
    key: 2,
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
    comments: 'Hello, this is the text of my basic comment!',
    timeStamp: '55m ago'
}

const rowStyle = {
    padding: '0px 5px 10px 5px'
}

class Customer extends React.Component {
    render() {
        return (
            <div>
                <Row gutter={10} style={rowStyle}>
                    <Col span={12}><Text variant="xLarge" nowrap block>Customer Name</Text></Col>
                </Row>
                <Row gutter={10} style={rowStyle}>
                    <Col span={4}><Text variant="large" nowrap block>Customer data</Text></Col>
                    <Col span={4}><Text variant="large" nowrap block>Customer projects</Text></Col>
                    <Col span={4}><Text variant="large" nowrap block>Change history</Text></Col>
                </Row>
                <Row gutter={20} style={rowStyle}>
                    <Col span={4}>
                        <CustomerDataCommandBar />
                        <TextField label="Customer or company name" defaultValue="Customer name" />
                        <TextField label="Phone number" defaultValue="+300 (900) 22244455" />
                        <TextField label="Email address" defaultValue="customer@company.com" />
                        <TextField label="Customer address" defaultValue="P.O. Box 886 4118 Arcu St. Rolling Hills Georgia 92358" />
                    </Col>
                    <Col span={4}>
                        <CustomerProjectCommandBar />
                        <CustomerProjectDropdown />
                        <CustomerProjectDatepicker />
                        <CustomerProjectDatepicker />
                        <TextField label="Estimated number of working days" defaultValue="12" />
                    </Col>
                    <Col span={4}>
                        <ActivityItem {...activityItemExamples} key={activityItemExamples.key} className={classNames.exampleRoot} />
                        <ActivityItem {...activityItemExamples2} key={activityItemExamples2.key} className={classNames.exampleRoot} />
                    </Col>
                </Row>
                <Row gutter={10} style={rowStyle}>
                    <Col span={4} style={{ textAlign: 'center' }}><ActionButton iconProps={{ iconName: 'More' }}>More details</ActionButton></Col>
                    <Col span={4} style={{ textAlign: 'center' }}><ActionButton iconProps={{ iconName: 'More' }}>More details</ActionButton></Col>
                    <Col span={4} style={{ textAlign: 'center' }}><ActionButton iconProps={{ iconName: 'FullHistory' }}>Full history</ActionButton></Col>
                </Row>
            </div>
        )
    }
}

export default Customer