import React, {Component} from 'react';
import { Label } from '@progress/kendo-react-labels';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { Button} from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';

import moment from 'moment';

import '../Addition.css';
import API from '../api'


const termData = ['Prime','Secondary'];
const prodId = 'Product';
const faciId = 'Facility Origin';
const deliId = 'Delivery Location';
const shipId = 'Shipper';
const shipAgentId = 'Shipper Agent';
const shipDateId = 'Ship Date/Time';
const volId = 'Volume (Litres)';
const volGalId = 'Volume (Gall)';
const termId = 'Service';
const expDateId = 'Expected Delivery Date';
const estDateId = 'Estimated Delivery Date';
var prodAllData =  [];
var faciAllData = [];
var deliAllData = [];
var shipAllData = [];
var shipAgentAllData = [];
var shipAgentTmpData = [];
        
class AdditionScreen extends Component {
    defaultValue = new Date();
    
    
    state = {
        prodData: prodAllData.slice(),
        faciData: faciAllData.slice(),
        deliData: deliAllData.slice(),
        shipData: shipAllData.slice(),
        shipAgentData: shipAgentAllData.slice(),
        shipTmpAgentData: shipAgentTmpData.slice(),
        termData: termData,
        calGal: "",
        prodVal: '',
        faciVal: '',
        deliVal: '',
        shipVal: '',
        shipAgentVal: '',
        shipDateVal: this.defaultValue,
        volVal: "",
        serviceVal: "Prime",
        expDateVal: this.defaultValue,
        estDateVal: "",
        curCreatedNomData: "",
        canBeSubmit: false,
        depAllData: [],
        depProdFields:[],
        arrAllData: [],
        arrProdFields:[],
    }
    componentDidMount() {
        API.get(`get-additions/`)
        .then(res => {
            const tmpData = res.data
            console.log(tmpData);
            prodAllData = tmpData.products;
            faciAllData = tmpData.facilities;
            shipAllData = tmpData.shippers;
            shipAgentAllData = tmpData.shipperAgents;
            deliAllData = tmpData.facilities;
            this.setState({
                prodData: prodAllData.slice(),
                faciData: faciAllData.slice(),
                deliData: deliAllData.slice(),
                shipData: shipAllData.slice(),
                shipTmpAgentData: shipAllData.length > 0 ? this.getShipperAgents(shipAllData[0], shipAgentAllData) : {},
                shipAgentData: shipAllData.length > 0 ? this.getShipperAgents(shipAllData[0], shipAgentAllData) : {},
                shipVal: shipAllData.length > 0 ? shipAllData[0] : {},
            })
            console.log(this.state.shipVal)
            this.getNomeData();
        })
    }
    filterChange = (event, type) => {
        console.log(type);
        if(type === prodId){
            this.setState({
                prodData: this.filterData(event.filter, prodAllData)
            });
        }else if(type === faciId){
            this.setState({
                faciData: this.filterData(event.filter, faciAllData)
            });
        }else if(type === deliId){
            this.setState({
                deliData: this.filterData(event.filter, deliAllData)
            });
        }else if(type === shipId){
            this.setState({
                shipData: this.filterData(event.filter, shipAllData)
            });
        }else if(type === shipAgentId){
            this.setState({
                shipAgentData: this.filterData(event.filter, this.state.shipTmpAgentData)
            });
        }
        
    }
    getShipperAgents(shipper){
        var temp = [];
        shipAgentAllData.forEach(element => {
            if (element.shipper === shipper.id){
                temp.push(element)
            }
        });
        return temp
    }
    filterData(filter, tempAllData) {
        const data = tempAllData.slice();
        return filterBy(data, filter);
    }
    calculateGal = (event) => {
        this.setState({
            calGal: event.value !== null ? parseFloat(event.value)*0.264172 : "",
            volVal: event.value !== null ? parseFloat(event.value) : ""
        })
    }
    handleAddnome = (event) =>{
        console.log("OKOKOK");
        event.preventDefault();
        API.post(`create-nome/`, 
        { 
            prod_id: this.state.prodVal.id,
            org_faci: this.state.faciVal.id,
            deli_faci: this.state.deliVal.id,
            shipper: this.state.shipVal.id,
            shipper_agent: this.state.shipAgentVal.id,
            ship_date: this.state.shipDateVal,
            volume: this.state.volVal,
            service: this.state.serviceVal,
            exp_date: this.state.expDateVal,
            user_id: localStorage.getItem('user_id')
        })
        .then(res => {
            console.log(res.data)
            var date = moment(res.data.est_date);
            var estDateVal = date.utc().format('YYYY-MM-DD') + " " + date.utc().format('HH:mm:ss');;
            this.setState({
                estDateVal: estDateVal,
                curCreatedNomData: res.data,
                canBeSubmit: true,
            })
        })
    }
    handleSubmit = (event) =>{
        console.log("BBBBB")
        event.preventDefault();
        console.log(this.state.curCreatedNomData);
        API.post(`confirm-nome/`, this.state.curCreatedNomData)
        .then(res => {
            console.log(res.data)
            this.setState({
                canBeSubmit: false
            })
            this.getNomeData();
        })
    }
    getNomeData = () => {
        API.post(`get-nome/`, {"cur_date": this.defaultValue})
        .then(res => {
            console.log(res.data)
            this.setState({
                depProdFields: res.data.dep_prod_names,
                depAllData: res.data.dep_all_data,
                arrProdFields: res.data.arr_prod_names,
                arrAllData: res.data.arr_all_data,
            })
        })
    }
    expandChange = (event) => {
        const isExpanded =
            event.dataItem.expanded === undefined ?
                event.dataItem.aggregates : event.dataItem.expanded;
        event.dataItem.expanded = !isExpanded;

        this.setState({ ...this.state });
    }
    render(){
        
        let mainHeight = this.props.mainHeight;
        
        return (
            <div className="addition-screen" style={{height:(mainHeight - 63)}}>
                <div className="row" style={{height:(mainHeight - 63)}} >
                    <div className="form-part p-1 my-auto">
                        <form onSubmit={this.handleAddnome}>
                            <div className="row">
                                <div className="col-6">
                                    <Label editorId={prodId}>{prodId}</Label>
                                </div>
                                <div className="col-6">
                                    <ComboBox
                                        id={prodId}
                                        data={this.state.prodData}
                                        textField="name_shrt"
                                        dataItemKey="id"
                                        filterable={true}
                                        onFilterChange={(evt)=>this.filterChange(evt, prodId)}
                                        style={{ width: "100%"}}
                                        placeholder={"Select " + prodId}
                                        required={true}
                                        value = {this.state.prodVal}
                                        onChange = { (evt) => {
                                            this.setState({prodVal:evt.target.value})
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={faciId}>{faciId}</Label>
                                </div>
                                <div className="col-6">
                                    <ComboBox
                                        id={faciId}
                                        data={this.state.faciData}
                                        textField="name_shrt"
                                        dataItemKey="id"
                                        filterable={true}
                                        onFilterChange={(evt)=>this.filterChange(evt, faciId)}
                                        style={{ width: "100%"}}
                                        placeholder={"Select " + faciId}
                                        required={true}
                                        value = {this.state.faciVal}
                                        onChange = { (evt) => {
                                            this.setState({
                                                faciVal:evt.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={deliId}>{deliId}</Label>
                                </div>
                                <div className="col-6">
                                    <ComboBox
                                        id={deliId}
                                        data={this.state.deliData}
                                        textField="name_shrt"
                                        dataItemKey="id"
                                        filterable={true}
                                        onFilterChange={(evt)=>this.filterChange(evt, deliId)}
                                        style={{ width: "100%"}}
                                        placeholder={"Select " + deliId}
                                        required={true}
                                        value = {this.state.deliVal}
                                        onChange = { (evt) => {
                                            this.setState({
                                                deliVal:evt.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={shipId}>{shipId}</Label>
                                </div>
                                <div className="col-6">
                                    <ComboBox
                                        id={shipId}
                                        data={this.state.shipData}
                                        textField="name_shrt"
                                        dataItemKey="id"
                                        filterable={true}
                                        onFilterChange={(evt)=>this.filterChange(evt, shipId)}
                                        style={{ width: "100%"}}
                                        placeholder={"Select " + shipId}
                                        required={true}
                                        value = {this.state.shipVal}
                                        onChange = { (evt) => {
                                            this.setState({
                                                shipVal:evt.target.value,
                                                shipAgentData: this.getShipperAgents(evt.target.value),
                                                shipTmpAgentData: this.getShipperAgents(evt.target.value),
                                                shipAgentVal:{}
                                            })

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={shipAgentId}>{shipAgentId}</Label>
                                </div>
                                <div className="col-6">
                                    <ComboBox
                                        id={shipAgentId}
                                        data={this.state.shipAgentData}
                                        textField="name"
                                        dataItemKey="id"
                                        filterable={true}
                                        onFilterChange={(evt)=>this.filterChange(evt, shipAgentId)}
                                        style={{ width: "100%"}}
                                        placeholder={"Select " + shipAgentId}
                                        required={true}
                                        value = {this.state.shipAgentVal}
                                        onChange = { (evt) => {
                                            this.setState({
                                                shipAgentVal:evt.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={shipDateId}>{shipDateId}</Label>
                                </div>
                                <div className="col-6">
                                    <DateTimePicker 
                                        defaultValue={this.defaultValue}
                                        width={'100%'}
                                        value={this.state.shipDateVal}
                                        onChange={(e)=>{
                                            this.setState({
                                                shipDateVal:e.target.value
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={volId}>{volId}</Label>
                                </div>
                                <div className="col-6">
                                    <NumericTextBox 
                                        width="100%"
                                        placeholder="Enter Volume"
                                        required={true}
                                        number={this.state.volVal}
                                        onChange={this.calculateGal}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={volGalId}>{volGalId}</Label>
                                </div>
                                <div className="col-6">
                                    <Input 
                                        style={{ width: "100%" }}
                                        placeholder="calculated value"
                                        readOnly={true}
                                        value={this.state.calGal}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={termId}>{termId}</Label>
                                </div>
                                <div className="col-6">
                                    <DropDownList 
                                        data={this.state.termData} 
                                        defaultValue="Prime" 
                                        value={this.state.serviceVal}
                                        style={{ width: "100%"}}
                                        onChange={(e)=>{
                                            this.setState({
                                                serviceVal:e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-6">
                                    <Label editorId={expDateId}>{expDateId}</Label>
                                </div>
                                <div className="col-6">
                                    <DateTimePicker 
                                        defaultValue={this.defaultValue}
                                        width={'100%'}
                                        value={this.state.expDateVal}
                                        onChange={(e)=>{
                                            this.setState({
                                                expDateVal: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-6">
                                    <Button style={{width:"80%"}}>Addnom</Button>
                                </div>
                                <div className="col-6">
                                    <Button 
                                        style={{width:"80%"}} 
                                        onClick={this.handleSubmit} 
                                        disabled={!this.state.canBeSubmit}
                                    >Submit</Button>
                                </div>
                            </div>
                        </form>
                        <div className="row pt-4">
                            <div className="col-6">
                                <Label editorId={estDateId}>{estDateId}</Label>
                            </div>
                            <div className="col-6">
                                <Input 
                                    style={{ width: "100%" }}
                                    value={this.state.estDateVal}
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="grid-part" style={{height:(mainHeight - 63)}}>
                        <div className="sky-back-color">
                            <div className="row mt-1">
                                <div className="col-6" style={{borderRight:'1px solid white'}}>
                                    <h2 className="m-2">Dep1</h2>
                                    <Grid 
                                        data={this.state.depAllData} 
                                        style={{height:(mainHeight - 69 - 100), backgroundColor:"#b6d3ed"}}
                                        detail={DetailComponent}
                                        expandField="expanded"
                                        onExpandChange={this.expandChange}
                                    >
                                        <Column field="sel_date" title="Date"/>
                                        {this.state.depProdFields.map((value, index) => {
                                            return <Column field={value} key={index} title={value} />
                                        })}
                                    </Grid>
                                    <div className="row mt-2 mb-2">
                                        <div className="col-4 offset-2 my-auto p-0">
                                            <Label className="font-weight-bold">SAGIT  CONFLICT</Label>
                                        </div>
                                        <div className="col-4 p-0">
                                            <Input 
                                                style={{ width: "100%" }}
                                                placeholder="Calculated Value"
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h2 className="m-2">Arr1</h2>
                                    <Grid 
                                        data={this.state.arrAllData} 
                                        style={{height:(mainHeight - 69 - 100), backgroundColor:"#b6d3ed"}}
                                        detail={DetailComponent}
                                        expandField="expanded"
                                        onExpandChange={this.expandChange}
                                    >
                                        <Column field="sel_date" title="Date"/>
                                        {this.state.arrProdFields.map((value, index) => {
                                            return <Column field={value} key={index} title={value}/>
                                        })}
                                    </Grid>
                                    <div className="row mt-2 mb-2">
                                        <div className="col-4 my-auto p-0">
                                            <Label className="font-weight-bold">DELAY HOURS</Label>
                                        </div>
                                        <div className="col-4 p-0">
                                            <Input 
                                                style={{ width: "100%" }}
                                                placeholder="Calculated Value"
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className="col-2 offset-1 p-0">
                                            <Button 
                                                primary={true}
                                                style={{width: '100%'}}
                                            >RC</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
class DetailComponent extends GridDetailRow {
    render() {
        const dataItem = this.props.dataItem;
        return (
            <div>
                <Grid style={{ width: "100%" }} data={dataItem.details}>
                    <Column field="sel_date" title="Date" width="65"/>
                    <Column field="prod_name" title="Product" width="75"/>
                    <Column field="dest_name" title="Receipt Origin" width="97"/>
                    <Column field="vol" title="Volume" width="65"/>
                    <Column field="ship_name" title="Shipper" width="85"/>
                    <Column field="ship_id" title="Shipper ID" width="60"/>
                    <Column field="user_name" title="User" width="90"/>
                </Grid>
            </div>
        );
    }
}
export default AdditionScreen;