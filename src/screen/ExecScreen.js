import React, {Component} from 'react';
import { Button} from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Checkbox } from '@progress/kendo-react-inputs';


import ImgButton from '../components/ImgButton';
import sussex from '../image/Sussex.png';
import atken from '../image/Atken.png';
import bulb from '../image/bulb.png';
import track from '../image/track.png';
import ship from '../image/ship.png';
import tank from '../image/tank_one.png';

import { provideIntlService } from '@progress/kendo-react-intl';

import { ProdCell, AssetCell, ProductCell, UnitsCell, TimeUnitsCell } from '../components/DropDownCell.js';
import API from '../api';


class ExecScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
          assetData: [],
          prodData: [],
          transData: [],
          data:[],
          changes: false,
          isProducer: true,
          isAsset: false,
          isTransport: false,
          editID: null,
          newIndexID: 0,
          bGuarantee: false,
          bAllow: false,
          bPrioitize: false,
        };
        
    }
    componentDidMount() {
        API.get(`execs/`)
        .then(res => {
            let tmpProdData = JSON.parse(res.data.prodData)
            tmpProdData.map(item => {
                item.Start = provideIntlService(this).parseDate(item.Start, 'yyyy-MM-dd');
                item.End = provideIntlService(this).parseDate(item.End, 'yyyy-MM-dd');
                return tmpProdData;
            });
            let tmpAssetData = JSON.parse(res.data.assetData)
            tmpAssetData.map(item => {
                item.Start = provideIntlService(this).parseDate(item.Start, 'yyyy-MM-dd');
                item.End = provideIntlService(this).parseDate(item.End, 'yyyy-MM-dd');
                return tmpAssetData;
            });
            let tmpTransData = JSON.parse(res.data.transData)
            tmpTransData.map(item => {
                item.Start = provideIntlService(this).parseDate(item.Start, 'yyyy-MM-dd');
                item.End = provideIntlService(this).parseDate(item.End, 'yyyy-MM-dd');
                return tmpTransData;
            });
            let paramsData = JSON.parse(res.data.params)
            console.log(paramsData)
            this.setState({
                assetData: tmpAssetData,
                prodData: tmpProdData,
                transData: tmpTransData,
                data: tmpProdData,
                newIndexID: tmpProdData.length,
                bGuarantee: paramsData[0]["Guarantee"] === 1 ? true: false,
                bAllow: paramsData[0]["Holidays"] === 1 ? true: false,
                bPrioitize: paramsData[0]["Priority"] === 1 ? true: false
            })
            
        })
    }
    
    imgBtnClick = (val) => {
        
    }
    btnAddClick = () => {
        let newDataItem;
        this.setState({
            newIndexID: this.state.newIndexID +1
        })
        if (this.state.isProducer){
            newDataItem = {
                index: this.state.newIndexID, 
                Producer: "EGR", 
                Asset: "Atken", 
                "Max Delay": 22, 
                Product: "D1", 
                Volume: 222,
                Units:"MFD", 
                Duration: 222,
                "Time Units": "Hours",
                Start: provideIntlService(this).parseDate(new Date()),
                End: provideIntlService(this).parseDate(new Date())
            }
        }else if (this.state.isAsset){
            newDataItem = {
                index: this.state.newIndexID, 
                Asset: "Atken", 
                "Max Delay": 22, 
                Product: "D1", 
                Volume: 222,
                Units:"MFD", 
                Duration: 222,
                "Time Units": "Hours",
                Start: provideIntlService(this).parseDate(new Date()),
                End: provideIntlService(this).parseDate(new Date())
            }
        }else if (this.state.isTransport){
            newDataItem = {
                index: this.state.newIndexID,
                Priority: 1, 
                Asset: "Atken", 
                "Max Delay": 22, 
                "MaxDelay": 22,
                Product: "D1", 
                Volume: 222,
                Units:"MFD", 
                Duration: 222,
                "Time Units": "Hours",
                Start: provideIntlService(this).parseDate(new Date()),
                End: provideIntlService(this).parseDate(new Date())
            }
        }

        this.setState({
            data: [ ...this.state.data, newDataItem ],
            editID: this.state.newIndexID,
            changes: true
        });
    }
    btnSaveClick = () => {
        let tmpData = this.state.data
        tmpData.map(item => {
            item.Start = (item.Start.getYear()+ 1900) +"-"+ (item.Start.getMonth()+1) +"-"+ (item.Start.getDate());
            item.End = (item.End.getYear()+ 1900) +"-"+ (item.End.getMonth()+1) +"-"+ (item.End.getDate());
            return tmpData;
        });
        console.log(tmpData)
        API.post(`add-execs/`, 
        { 
            json_data: JSON.stringify(tmpData),
            isProducer: this.state.isProducer,
            isAsset: this.state.isAsset,
            isTransport: this.state.isTransport
        })
        .then(res => {
            let tmpAData = JSON.parse(res.data.data)
            tmpAData.map(item => {
                item.Start = provideIntlService(this).parseDate(item.Start, 'yyyy-MM-dd');
                item.End = provideIntlService(this).parseDate(item.End, 'yyyy-MM-dd');
                return tmpAData;
            });
            if (this.state.isProducer){
                this.setState({
                    prodData: tmpAData,
                    data: tmpAData
                })
            }
            if (this.state.isTransport){
                this.setState({
                    transData: tmpAData,
                    data: tmpAData
                })
            }
            if (this.state.isAsset){
                this.setState({
                    assetData: tmpAData,
                    data: tmpAData
                })
            }

        })
        this.setState({
            editID: null,
            changes: false
        });
        
        
    }
    changeParams = (val) => {
        console.log(val)
        
        let guarantee;
        let allow;
        let prioitize;
        if (val === "G"){
            guarantee = !this.state.bGuarantee
            allow = this.state.bAllow
            prioitize = this.state.bPrioitize
        }else if (val === "A"){
            allow = !this.state.bAllow
            guarantee = this.state.bGuarantee
        }else{
            prioitize = !this.bPrioitize
            guarantee = this.state.bGuarantee
            allow = this.state.bAllow
        }
        
        API.post(`change-params/`, 
        { 
            guarantee: guarantee ? 1 : 0,
            allow: allow ? 1 : 0,
            prioitize: prioitize ? 1 : 0
        })
        .then(res => {
            let paramsData = JSON.parse(res.data.params)
            this.setState({
                bGuarantee: paramsData[0]["Guarantee"] === 1 ? true: false,
                bAllow: paramsData[0]["Holidays"] === 1 ? true: false,
                bPrioitize: paramsData[0]["Priority"] === 1 ? true: false
            })
        })
    }
    closeEdit = (event) => {
        if (event.target === event.currentTarget) {
            this.setState({ editID: null });
        }
    };
    btnRunClick = () => {

    }
    changeType = (val) => {
        if (val === "P"){
            this.setState({
                isProducer:true,
                isAsset: false,
                isTransport: false,
                data: this.state.prodData,
                newIndexID: this.state.prodData.length
            })
        }else if(val === "A"){
            this.setState({
                isProducer: false,
                isAsset: true,
                isTransport: false,
                data: this.state.assetData,
                newIndexID: this.state.assetData.length
            })
        }
        else if(val === "T"){
            this.setState({
                isProducer: false,
                isAsset: false,
                isTransport: true,
                data: this.state.transData,
                newIndexID: this.state.transData.length
            })
        }
    }
    rowClick = (event) => {
        this.setState({
            editID: event.dataItem.index
        });
    };
    itemChange = (event) => {
        const inEditID = event.dataItem.index;
        const data = this.state.data.map(item =>
            item.index === inEditID ? {...item, [event.field]: event.value} : item
        );
        this.setState({ 
            data,
            changes: true
        });
    }
    render(){
        let mainWidth = this.props.mainWidth;
        let mainHeight = this.props.mainHeight;
        
        return (
            <div className="ExecScreen" style={{height:(mainHeight - 63)}}>
                <div className="row" >
                    <div className="col-3">
                        <div className="row" style={{paddingTop:mainHeight/25}}>
                            <div className="col-6">
                                <ImgButton imgSrc={atken} imgLabel="Atken" onClick={this.imgBtnClick}/>
                            </div>
                            <div className="col-6">
                                <ImgButton imgSrc={atken} imgLabel="Goldy" onClick={this.imgBtnClick}/>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop:mainHeight/25}}>
                            <div className="col-6">
                                <ImgButton imgSrc={atken} imgLabel="Blair" onClick={this.imgBtnClick}/>
                            </div>
                            <div className="col-6">
                                <ImgButton imgSrc={sussex} imgLabel="Sussex" onClick={this.imgBtnClick}/>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop:mainHeight/13}}>
                            <div className="col-6">
                                <ImgButton imgSrc={bulb} imgLabel="" onClick={this.imgBtnClick}/>
                            </div>
                            <div className="col-6">
                                <ImgButton imgSrc={track} imgLabel="" onClick={this.imgBtnClick}/>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop:mainHeight/35}}>
                            <div className="col-6">
                                <ImgButton imgSrc={tank} onClick={this.imgBtnClick}/>
                            </div>
                            <div className="col-6">
                            <   ImgButton imgSrc={ship} onClick={this.imgBtnClick}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="" style={{height:(mainHeight - 69), width:mainWidth*0.74}}>
                        <div className="row">
                            <div className="col-12">
                                <h2 style={{textAlign:"center"}}>Model Exec</h2>
                            </div>
                            <div className="col-4">
                                <ul style={{width: 150*mainWidth/986}}>
                                    <li>
                                        <Button style={{fontSize:parseInt(15*mainWidth/986), backgroundColor: this.state.isProducer ? "rgb(0, 191, 255)" : "#808080"}} onClick={( )=>{this.changeType("P")}}>Producer</Button>
                                    </li>
                                    <li>
                                        <Button style={{fontSize:parseInt(15*mainWidth/986),  backgroundColor: this.state.isAsset ? "rgb(0, 191, 255)" : "#808080" }} onClick={( )=>{this.changeType("A")}}>Asset</Button>
                                    </li>
                                    <li>
                                        <Button style={{fontSize:parseInt(15*mainWidth/986),  backgroundColor: this.state.isTransport ? "rgb(0, 191, 255)" : "#808080"}} onClick={( )=>{this.changeType("T")}}>Transportation</Button>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3 btn-new-save"  style={{padding:0}}>
                                <div style={{position:"absolute", bottom:0}}>
                                    <Button style={{fontSize:parseInt(15*mainWidth/986), width:70*mainWidth/986}} onClick={this.btnAddClick}>New</Button>
                                    {this.state.changes && <Button style={{fontSize:parseInt(15*mainWidth/986), width:70*mainWidth/986}} onClick={this.btnSaveClick}>Save</Button>}
                                </div>
                            </div>
                            <div className="col-5">
                                <ul style={{width: 235*mainWidth/986}} className="chk-ul">
                                    <li>
                                        <Checkbox id={'chb1'} value={this.state.bGuarantee} onChange={()=>{this.changeParams("G")}}>
                                            <label htmlFor={'chb1'} className={'k-checkbox-label'} style={{ 'display': 'inline-block', fontSize:parseInt(15*mainWidth/986)}}>
                                                Guarantee Completion Time
                                            </label>
                                        </Checkbox>
                                    </li>
                                    <li>
                                        <Checkbox id={'chb2'} value={this.state.bAllow} onChange={()=>{this.changeParams("A")}}>
                                            <label htmlFor={'chb2'} className={'k-checkbox-label'} style={{ 'display': 'inline-block', fontSize:parseInt(15*mainWidth/986)}}>
                                                Allow Holiday Breaks
                                            </label>
                                        </Checkbox>
                                    </li>
                                    <li>
                                        <Checkbox id={'chb3'} value={this.state.bPrioitize} onChange={()=>{this.changeParams("P")}}>
                                            <label htmlFor={'chb3'} className={'k-checkbox-label'} style={{ 'display': 'inline-block', fontSize:parseInt(15*mainWidth/986)}}>
                                                Prioitize Cost Criteria
                                            </label>
                                        </Checkbox>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="row" style={{width:mainWidth*0.747, paddingTop: 8*mainHeight/586}}>
                            {this.state.isProducer && 
                            <Grid 
                                data={this.state.data.map((item) =>
                                    ({ ...item, inEdit: item.index === this.state.editID })
                                )}
                                onRowClick={this.rowClick}
                                editField="inEdit"
                                onItemChange={this.itemChange}
                                style={{height:(mainHeight-63)*0.67, backgroundColor:"#b6d3ed"}}
                            >
                                <Column field="Producer" title="Producer" width={65*mainWidth/986} cell={ProdCell}/>
                                <Column field="Asset" title="Asset" width={60*mainWidth/986} cell={AssetCell}/>
                                <Column field="Max Delay" title="Max Delay" width={70*mainWidth/986} editor="numeric"/>
                                <Column field="Product" title="Product" width={60*mainWidth/986} cell={ProductCell}/>
                                <Column field="Volume" title="Volume" width={55*mainWidth/986} editor="numeric"/>
                                <Column field="Units" title="Units" width={50*mainWidth/986} cell={UnitsCell}/>
                                <Column field="Duration" title="Duration" width={65*mainWidth/986} editor="numeric"/>
                                <Column field="Time Units" title="Time Units" width={80*mainWidth/986} cell={TimeUnitsCell}/>
                                <Column field="Start" title="Start" editor="date" format="{0:d}"/>
                                <Column field="End" title="End" editor="date" format="{0:d}"/>
                            </Grid>}
                            {/* Asset Data */}
                            {this.state.isAsset && 
                            <Grid 
                                data={this.state.data.map((item) =>
                                    ({ ...item, inEdit: item.index === this.state.editID })
                                )}
                                onRowClick={this.rowClick}
                                editField="inEdit"
                                onItemChange={this.itemChange}
                                style={{height:(mainHeight-63)*0.67, backgroundColor:"#b6d3ed"}}
                            >
                                <Column field="Asset" title="Asset" width={65*mainWidth/986} cell={AssetCell}/>
                                <Column field="Max Delay" title="Max Delay" width={75*mainWidth/986} editor="numeric"/>
                                <Column field="Product" title="Product" width={65*mainWidth/986} cell={ProductCell}/>
                                <Column field="Volume" title="Volume" width={60*mainWidth/986} editor="numeric"/>
                                <Column field="Units" title="Units" width={55*mainWidth/986} cell={UnitsCell}/>
                                <Column field="Duration" title="Duration" width={70*mainWidth/986} editor="numeric"/>
                                <Column field="Time Units" title="Time Units" width={85*mainWidth/986} cell={TimeUnitsCell}/>
                                <Column field="Start" title="Start" editor="date" format="{0:d}"/>
                                <Column field="End" title="End" editor="date" format="{0:d}"/>
                            </Grid>}
                            {/* Transportation Data */}
                            {this.state.isTransport && 
                            <Grid 
                                data={this.state.data.map((item) =>
                                    ({ ...item, inEdit: item.index === this.state.editID })
                                )}
                                onRowClick={this.rowClick}
                                editField="inEdit"
                                onItemChange={this.itemChange}
                                style={{height:(mainHeight-63)*0.67, backgroundColor:"#b6d3ed"}}
                            >
                                <Column field="Priority" title="Priority" width={65*mainWidth/986} editor="numeric"/>
                                <Column field="Max Delay" title="Max Delay" width={70*mainWidth/986} editor="numeric"/>
                                <Column field="Asset" title="Asset" width={60*mainWidth/986} cell={AssetCell}/>
                                <Column field="MaxDelay" title="Max Delay" width={70*mainWidth/986} editor="numeric"/>
                                <Column field="Product" title="Product" width={60*mainWidth/986} cell={ProductCell}/>
                                <Column field="Volume" title="Volume" width={55*mainWidth/986} editor="numeric"/>
                                <Column field="Units" title="Units" width={50*mainWidth/986} cell={UnitsCell}/>
                                <Column field="Duration" title="Duration" width={65*mainWidth/986} editor="numeric"/>
                                <Column field="Time Units" title="Time Units" width={80*mainWidth/986} cell={TimeUnitsCell}/>
                                <Column field="Start" title="Start" editor="date" format="{0:d}"/>
                                <Column field="End" title="End" editor="date" format="{0:d}"/>
                            </Grid>}
                        </div>
                    </div>
                    
                </div>
                <Button style={{fontSize:16*mainWidth/986, position:"absolute", bottom:10, left:70*mainWidth/986}} onClick={this.btnRunClick}>Run Scenario</Button>
            </div>
        );
    }
}
export default ExecScreen;