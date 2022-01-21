import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export class ProdCell extends React.Component {
    localizedData = [
        { text: 'EGR', value: 'EGR' },
        { text: 'FRD', value: 'FRD' },
        { text: 'TTZ', value: 'TTZ' }
    ];

    handleChange = (e) => {
        this.props.onChange({
            dataItem: this.props.dataItem,
            field: this.props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.target.value.value
        });
    }

    render() {
        const { dataItem, field } = this.props;
        const dataValue = dataItem[field] === null ? '' : dataItem[field];

        return (
            <td>
                {dataItem.inEdit ? (
                    <DropDownList
                        style={{width: "100%"}}
                        onChange={this.handleChange}
                        value={this.localizedData.find(c => c.value === dataValue)}
                        data={this.localizedData}
                        textField="text"
                    />
                ) : (
                    dataValue.toString()
                )}
            </td>
        );
    }
}

export class AssetCell extends React.Component {
    localizedData = [
        { text: 'Atken', value: 'Atken' },
        { text: 'Goldy', value: 'Goldy' },
        { text: 'Blair', value: 'Blair' },
        { text: 'Sussex', value: 'Sussex' }
    ];

    handleChange = (e) => {
        this.props.onChange({
            dataItem: this.props.dataItem,
            field: this.props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.target.value.value
        });
    }

    render() {
        const { dataItem, field } = this.props;
        const dataValue = dataItem[field] === null ? '' : dataItem[field];

        return (
            <td>
                {dataItem.inEdit ? (
                    <DropDownList
                        style={{width: "100%"}}
                        onChange={this.handleChange}
                        value={this.localizedData.find(c => c.value === dataValue)}
                        data={this.localizedData}
                        textField="text"
                    />
                ) : (
                    dataValue.toString()
                )}
            </td>
        );
    }
}
export class ProductCell extends React.Component {
    localizedData = [
        { text: 'D1', value: 'D1' },
        { text: 'D2', value: 'D2' },
        { text: 'D3', value: 'D3' }
    ];

    handleChange = (e) => {
        this.props.onChange({
            dataItem: this.props.dataItem,
            field: this.props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.target.value.value
        });
    }

    render() {
        const { dataItem, field } = this.props;
        const dataValue = dataItem[field] === null ? '' : dataItem[field];

        return (
            <td>
                {dataItem.inEdit ? (
                    <DropDownList
                        style={{width: "100%"}}
                        onChange={this.handleChange}
                        value={this.localizedData.find(c => c.value === dataValue)}
                        data={this.localizedData}
                        textField="text"
                    />
                ) : (
                    dataValue.toString()
                )}
            </td>
        );
    }
}
export class UnitsCell extends React.Component {
    localizedData = [
        { text: 'MFD', value: 'MFD' },
        { text: 'DDR', value: 'DDR' },
        { text: 'BBD', value: 'BBD' }
    ];

    handleChange = (e) => {
        this.props.onChange({
            dataItem: this.props.dataItem,
            field: this.props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.target.value.value
        });
    }

    render() {
        const { dataItem, field } = this.props;
        const dataValue = dataItem[field] === null ? '' : dataItem[field];

        return (
            <td>
                {dataItem.inEdit ? (
                    <DropDownList
                        style={{width: "100%"}}
                        onChange={this.handleChange}
                        value={this.localizedData.find(c => c.value === dataValue)}
                        data={this.localizedData}
                        textField="text"
                    />
                ) : (
                    dataValue.toString()
                )}
            </td>
        );
    }
}

export class TimeUnitsCell extends React.Component {
    localizedData = [
        { text: 'Hours', value: 'Hours' },
        { text: 'Days', value: 'Days' },
        { text: 'Weeks', value: 'Weeks' },
        { text: 'Months', value: 'Months' },
        { text: 'Years', value: 'Years' }
    ];

    handleChange = (e) => {
        this.props.onChange({
            dataItem: this.props.dataItem,
            field: this.props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.target.value.value
        });
    }

    render() {
        const { dataItem, field } = this.props;
        const dataValue = dataItem[field] === null ? '' : dataItem[field];

        return (
            <td>
                {dataItem.inEdit ? (
                    <DropDownList
                        style={{width: "100%"}}
                        onChange={this.handleChange}
                        value={this.localizedData.find(c => c.value === dataValue)}
                        data={this.localizedData}
                        textField="text"
                    />
                ) : (
                    dataValue.toString()
                )}
            </td>
        );
    }
}