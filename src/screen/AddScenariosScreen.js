import React, {Component} from 'react';
import { Button} from '@progress/kendo-react-buttons';
import { Popup } from '@progress/kendo-react-popup'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import ImgButton from '../components/ImgButton';
import sussex from '../image/Sussex.png';
import atken from '../image/Atken.png';
import bulb from '../image/bulb.png';
import track from '../image/track.png';
import ship from '../image/ship.png';
import tank from '../image/tank_one.png';
import PopupButton from '../components/PopupButton';
import PopupInput from '../components/PopupInput';
import PopupCalendar from '../components/PopupCalendar';
import API from '../api';

const prodItems=['Producer', 'EGR', 'TTZ', 'FRD'];
const productItems=['Product', 'D1', 'D2', 'D3'];
const unitItems=['Units', 'MFD', 'DDR', 'BBD'];
const timeUnitItems=['Time Units', 'Hours', 'Days', 'Months'];
class AddScenariosScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          assetVal: "Asset",
          producerVal: "Producer",
          productVal: "Product",
          volVal: "Volume",
          unitsVal: "Units",
          duraVal: "Duration",
          timeUnitsVal: "Time Units",
          startVal: "Start",
          endVal: "End",
          isShowPopBtn: false,
          isShowPopInput: false,
          isShowPopCal: false,
          popupLeft: 0,
          items: prodItems, 
          curCtrl: "Producer",
          inputTitle: "Volume",
          isInvalidPop: false,
          canDelete: false,
          deleteIDs:[],
          data: []
        };
        
    }
    componentDidMount() {
        API.get(`get-scenarios/`)
        .then(res => {
            const tmpData = JSON.parse(res.data)
            this.setState({
                data: tmpData.map(dataItem => Object.assign({ selected: false }, dataItem))
            })
        })
    }
    
    popBtnClick = (val) => {
        let tmpPopupLeft = 0;
        let tmpItems;
        if ( val === "Asset" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8
        }else if ( val === "Producer" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8 + (this.props.mainWidth*0.74) /9 * 1
            tmpItems = prodItems
        }else if ( val === "Product" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8 + (this.props.mainWidth*0.74) /9 * 2
            tmpItems = productItems
        }else if ( val === "Units" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8 + (this.props.mainWidth*0.74) /9 * 4
            tmpItems = unitItems
        }else if ( val === "Time Units" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8 + (this.props.mainWidth*0.74) /9 * 6
            tmpItems = timeUnitItems
        }
        this.setState({
            isShowPopBtn: true,
            popupLeft: tmpPopupLeft,
            items: tmpItems,
            curCtrl: val
        });
    }
    popItemClick = (val) => {
        
        if (this.state.curCtrl === "Producer"){
            this.setState({
                isShowPopBtn: false,
                producerVal: val 
            });
        }else if (this.state.curCtrl === "Product"){
            this.setState({
                isShowPopBtn: false,
                productVal: val 
            });
        }else if (this.state.curCtrl === "Units"){
            this.setState({
                isShowPopBtn: false,
                unitsVal: val 
            });
        }else if (this.state.curCtrl === "Time Units"){
            this.setState({
                isShowPopBtn: false,
                timeUnitsVal: val 
            });
        }else if (this.state.curCtrl === "Volume"){
            this.setState({
                isShowPopInput: false,
                volVal: val 
            });
        }else if (this.state.curCtrl === "Duration"){
            this.setState({
                isShowPopInput: false,
                duraVal: val 
            });
        }else if (this.state.curCtrl === "Start"){
            this.setState({
                isShowPopCal: false,
                startVal: val 
            });
        }else if (this.state.curCtrl === "End"){
            this.setState({
                isShowPopCal: false,
                endVal: val 
            });
        }
    }
    popInputClick = (val) => {
        console.log(val);
        let tmpPopupLeft = 0;
        if ( val === "Volume" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8 + (this.props.mainWidth*0.74) /9 * 3
        }else if ( val === "Duration" ){
            tmpPopupLeft = this.props.mainWidth*0.25 + 8 + (this.props.mainWidth*0.74) /9 * 5
        }
        this.setState({
            isShowPopInput: true,
            popupLeft: tmpPopupLeft,
            curCtrl: val
        });
    }
    popCalClick = (val) => {
        this.setState({
            isShowPopCal: true,
            curCtrl: val
        });
    }
    outSideClick = () =>{
        this.setState({
            isShowPopBtn: false,
            isShowPopInput: false,
            isShowPopCal:false,
        });
    }
    imgBtnClick = (val) => {
        if (val !== "" && val){
            this.setState({
                assetVal: val
            })
        }
    }
    btnAddClick = () => {
        let canAdd = true
        if (this.state.assetVal === "Asset" || this.state.producerVal === "Producer" || this.state.productVal === "Product" || this.state.volVal === "Volume"
        || this.state.unitsVal === "Units" || this.state.duraVal === "Duration" || this.state.timeUnitsVal === "Time Units" || this.state.startVal === "Start" || this.state.endVal === "End"){
            canAdd = false
        }
        if (canAdd === false){
            this.setState({isInvalidPop:true})
        }else{
            API.post(`save-scenarios/`, 
            { 
                Asset: this.state.assetVal,
                Producer: this.state.producerVal,
                Product: this.state.productVal,
                Volume: this.state.volVal,
                Units: this.state.unitsVal,
                TimeUnits: this.state.timeUnitsVal,
                Duration: this.state.duraVal,
                Start: this.state.startVal,
                End: this.state.endVal 
            })
            .then(res => {
                const tmpData = JSON.parse(res.data)
                this.setState({
                    data: tmpData.map(dataItem => Object.assign({ selected: false }, dataItem))
                })
            })
        }
    }
    btnDeleteClick = () => {
        console.log(this.state.deleteIDs)
        let temp_data = [];
        this.state.data.map(item => {
            if( !this.state.deleteIDs.includes(item.Scenario) ){
                temp_data.push(item)
            }
            return true;
        });
        API.post(`delete-scenarios/`, 
        { 
            delIDs: this.state.deleteIDs
        })
        .then(res => {
            this.setState({ data : temp_data, deleteIDs: [], canDelete: false });
        })
        
    }
    btnOKClick = () => {
        this.setState({isInvalidPop:false})
    }
    selectionChange = (event) => {
        const data = this.state.data.map(item=>{
            if(item.Scenario === event.dataItem.Scenario){
                item.selected = !event.dataItem.selected;
            }
            return item;
        });
        let tmpDelIDs = this.state.deleteIDs
        if(event.dataItem.selected){
            tmpDelIDs.push(event.dataItem.Scenario)
        }else{
            let index = tmpDelIDs.indexOf(event.dataItem.Scenario)
            if (index !== -1) {
                tmpDelIDs.splice(index, 1);
            }
        }
        let tmpCanDelete = tmpDelIDs.length > 0 ? true : false;
        this.setState({ data, deleteIDs: tmpDelIDs, canDelete: tmpCanDelete });
    }
    headerSelectionChange = (event) => {
        let tmpDelIDs = []
        
        const checked = event.syntheticEvent.target.checked;
        const data = this.state.data.map(item=>{
            item.selected = checked;
            
            if (checked){
                tmpDelIDs.push(item.Scenario);
            }
            return item;
        });
        let tmpCanDelete = tmpDelIDs.length > 0 ? true : false;
        this.setState({ data, deleteIDs: tmpDelIDs, canDelete:tmpCanDelete });
    }
    render(){
        let mainWidth = this.props.mainWidth;
        let mainHeight = this.props.mainHeight;
        
        let offsetSystem = { left: (mainWidth/0.83-mainWidth*0.35)/2, top: mainHeight*0.3 };
        
        return (
            <div className="AddScenariosScreen" style={{height:(mainHeight - 63)}}>
                <div className="row">
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
                    <div className="GrayBack" style={{height:(mainHeight - 69), width:mainWidth*0.74}}>
                        <div className="row">
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button >{this.state.assetVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popBtnClick("Producer")}>{this.state.producerVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popBtnClick("Product")}>{this.state.productVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popInputClick("Volume")}>{this.state.volVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popBtnClick("Units")}>{this.state.unitsVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popInputClick("Duration")}>{this.state.duraVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popBtnClick("Time Units")}>{this.state.timeUnitsVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popCalClick("Start")}>{this.state.startVal}</Button>
                            </div>
                            <div className="col-drop" style={{ paddingLeft:2, paddingRight:2}}>
                                <Button onClick={() => this.popCalClick("End")}>{this.state.endVal}</Button>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.isShowPopBtn && 
                                <PopupButton width={(mainWidth*0.74) /9} itemVal={this.state.items} left={this.state.popupLeft} outSideClick={ this.outSideClick } itemClick={this.popItemClick}/> 
                            }
                            {this.state.isShowPopInput && 
                                <PopupInput width={(mainWidth*0.74) /9} title={this.state.curCtrl} left={this.state.popupLeft} itemClick={ this.popItemClick} outSideClick={ this.outSideClick }/>}
                            {this.state.isShowPopCal && <PopupCalendar width={(mainWidth)} height={(mainHeight-69)} outSideClick={ this.outSideClick } itemClick={ this.popItemClick}/>}
                        </div>
                        <div className="row add-btn" style={{ paddingTop:90, paddingRight: 10, paddingBottom: 10, float: 'right'}}>
                            {this.state.canDelete && <Button style={{fontSize:16, marginRight: 10}} onClick={this.btnDeleteClick}>Delete Scenario</Button>}
                            <Button style={{fontSize:16}} onClick={this.btnAddClick}>Add Scenario</Button>
                        </div>
                        <div className="row" style={{width:mainWidth*0.74}}>
                            <Grid data={this.state.data} style={{height:(mainHeight -69 - 166), backgroundColor:"#b6d3ed"}}
                                selectedField="selected"
                                onSelectionChange={this.selectionChange}
                                onHeaderSelectionChange={this.headerSelectionChange}
                            >
                                <Column
                                    field="selected"
                                    width="40px"
                                />
                                
                                <Column field="Scenario" title="Scenarios" width={70*mainWidth/986}/>
                                <Column field="Asset" title="Asset" width={60*mainWidth/986}/>
                                <Column field="Producer" title="Producer" width={65*mainWidth/986}/>
                                <Column field="Product" title="Product" width={60*mainWidth/986}/>
                                <Column field="Volume" title="Volume" width={55*mainWidth/986}/>
                                <Column field="Units" title="Units" width={50*mainWidth/986}/>
                                <Column field="Duration" title="Duration" width={65*mainWidth/986}/>
                                <Column field="Time Units" title="Time Units" width={80*mainWidth/986}/>
                                <Column field="Start" title="Start" />
                                <Column field="End" title="End" />
                            </Grid>
                            
                        </div>
                    </div>
                    
                </div>
                <Button primary={true}  style={{position:"absolute", bottom:10, left:10*mainWidth/986, backgroundColor:"#696969",borderColor:"#696969", fontSize:16*mainWidth/986}}  onClick={this.props.goCurrentState }>Current State</Button>
                <Button primary={true} style={{position:"absolute", bottom:10, left:130*mainWidth/986, backgroundColor:"#00bfff",borderColor:"#00bfff",fontSize:16*mainWidth/986}}>Add Scenarios</Button>
                <Popup
                    offset={ offsetSystem }
                    show={this.state.isInvalidPop}
                    popupClass={'popup-content'}
                    animate={false}
                >
                    <div className="notice-dlg" style={{ width: mainWidth*0.35}}>
                        <h2 >NOTICE</h2>
                        <p>Wrong values, Please select correct values</p>
                        <div className="btn-dlg">
                            <Button  onClick={this.btnOKClick}>OK</Button>
                        </div>
                    </div>  
                </Popup>
            </div>
        );
    }
}
export default AddScenariosScreen;