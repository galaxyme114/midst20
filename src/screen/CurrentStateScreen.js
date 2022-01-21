import React, {Component} from 'react';
import { Button} from '@progress/kendo-react-buttons';

import StoreNode from '../components/StoreNode';
import CondeNode from '../components/CondeNode';
import ImgButton from '../components/ImgButton';
import sussex from '../image/Sussex.png';
import bulb from '../image/bulb.png';
import alder from '../image/Alder.png';
import tank from '../image/tank.png';
import track from '../image/track.png';
import bg_date from '../image/bg_date.png';

import API from '../api';

class CurrentStateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentDate: 10,
            bMouseDown: false,
            levelsData:[]
        };
    }
    componentDidMount() {
        API.get(`levels/`)
        .then(res => {
            
            this.setState({
                levelsData: JSON.parse(res.data)
            })
        })
    }
    dateSliderClick = (e) => {
        let currentX = e.clientX - 670*this.props.mainWidth/1516;
        for (let i = 1; i <=31; i++){
            if (this.props.mainWidth*0.75/31*(i-1) < currentX &&  currentX < this.props.mainWidth*0.75/31*i){
                
                this.setState({
                    currentDate: i,
                    bMouseDown: true
                });
            }
        }
    }
    dateSliderMove = (e) => {
        let currentX = e.clientX - 670*this.props.mainWidth/1516;
        if (this.state.bMouseDown){
            for (let i = 1; i <=31; i++){
                if (this.props.mainWidth*0.75/31*(i-1) < currentX && currentX < this.props.mainWidth*0.75/31*i){
                    console.log(i);
                    this.setState({
                        currentDate: i,
                    });
                }
            }
        }
    }
    dateSliderUp = () => {
        this.setState({
            bMouseDown: false,
        })
    }
    dateSliderOut = () => {
        this.setState({
            bMouseDown: false,
        })
    }
    render(){
        let mainWidth = this.props.mainWidth;
        let mainHeight = this.props.mainHeight;
        let dateInterWidth = mainWidth*0.75/31;
        let dateInterHeight = 24*mainHeight/550;
        return (
            <div className="CurrentStateScreen" style={{height:(mainHeight - 63)}}>
                <div className="row" style={{height:60*mainHeight/550}}>
                    <div className="col-2" style={{ paddingTop: 10, textAlign:"right"}}>
                        <span style={{fontWeight:600, fontSize:"1.2em"}}>Day:</span>
                    </div>
                    <div className="col-10" style={{ paddingTop: 10, textAlign:"left"}}>
                        <div className="dateSlider selectDisable" style={{ width: mainWidth*0.75, height: (dateInterHeight + dateInterWidth/2)}} onMouseDown={(e)=>{this.dateSliderClick(e)}} onMouseMove={(e)=>{this.dateSliderMove(e)}} onMouseUp={()=>this.dateSliderUp()} onMouseLeave={()=>this.dateSliderOut()}>
                            <img className="selectDisable" src={bg_date} style={{ width: mainWidth*0.75, height: dateInterHeight}} alt="bg_date"/>
                            <div className="TransRect" style={{ width: dateInterWidth, height:dateInterHeight, left: dateInterWidth*(this.state.currentDate-1)}}  />
                            <div className="triangle" style={{ width: dateInterWidth, height:dateInterWidth/2, left: dateInterWidth*(this.state.currentDate-1), top:dateInterHeight, borderBottom:"solid "+dateInterWidth/2+"px rgb(36, 200, 30)", borderLeft:"solid "+dateInterWidth/2+"px transparent", borderRight:"solid "+dateInterWidth/2+"px transparent"}}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1" style={{height:(mainHeight - 173*mainHeight/550), paddingTop: (mainHeight - 63)/4}}>
                        <ImgButton imgSrc={sussex} imgLabel="Sussex"/>
                    </div>
                    <div className="col-3 rounded-rect" style={{height:(mainHeight - 173*mainHeight/550)}}>
                        <h3 style={{left:0, top:8*mainHeight/550}}>Alton Storage</h3>
                        <StoreNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["C2"] : 0} labelName="2" top={35*mainHeight/550} left={20*mainWidth/986}/>
                        <StoreNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["C3"] : 0} labelName="3" top={35*mainHeight/550} left={95*mainWidth/986}/>
                        <StoreNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["C5"] : 0} labelName="5" top={35*mainHeight/550} left={170*mainWidth/986}/>
                        <StoreNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["C4"] : 0} labelName="4" top={100*mainHeight/550} left={20*mainWidth/986}/>
                        <StoreNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["C5"] : 0} labelName="5" top={100*mainHeight/550} left={95*mainWidth/986}/>
                        <h4 style={{left:0, top:165*mainHeight/550}}>Conde Level (m<sup>3</sup>)</h4>
                        <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 2"] : 0} labelName="2" top={200*mainHeight/550} left={50*mainWidth/986}/>
                        <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 3"] : 0} labelName="3" top={200*mainHeight/550} left={110*mainWidth/986}/>
                        <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 3"] : 0} labelName="3" top={200*mainHeight/550} left={170*mainWidth/986}/>
                        <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 4"] : 0} labelName="4" top={285*mainHeight/550} left={50*mainWidth/986}/>
                        <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 5"] : 0} labelName="5" top={285*mainHeight/550} left={110*mainWidth/986}/>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <h3>Wuakasha Plant</h3>
                        </div>
                        <div className="row">
                            <div className="col-2" style={{paddingTop: (mainHeight - 63)/4, paddingLeft:10, paddingRight:10}}>
                                <ImgButton imgSrc={bulb} imgLabel=""/>
                            </div>
                            <div className="col-2" style={{paddingTop: (mainHeight - 63)/13, paddingLeft:0, paddingRight:0}}>
                                <span style={{fontSize:16, fontWeight:600}}>TTS</span>
                                <div className="TTS" >
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 2"] : 0} labelName="2" top={15*mainHeight/550} left={15*mainWidth/986}/>
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 3"] : 0} labelName="3" top={15*mainHeight/550} left={70*mainWidth/986}/>
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 4"] : 0} labelName="4" top={110*mainHeight/550} left={15*mainWidth/986}/>
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 5"] : 0} labelName="5" top={110*mainHeight/550} left={70*mainWidth/986}/>
                                </div>
                            </div>
                            <div className="col-2" style={{paddingTop: (mainHeight - 63)/4, paddingLeft:10, paddingRight:10}}>
                                <ImgButton imgSrc={bulb} imgLabel=""/>
                            </div>
                            <div className="col-2" style={{paddingTop: (mainHeight - 63)*0.24, paddingLeft:10, paddingRight:10}}>
                                <ImgButton imgSrc={alder} imgLabel="Alder"/>
                            </div>
                            <div className="col-2" style={{paddingTop: (mainHeight - 63)*0.3, paddingLeft:0, paddingRight:0}}>
                                <div className="TTS" >
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 2"] : 0} labelName="2" top={15*mainHeight/550} left={15*mainWidth/986}/>
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 3"] : 0} labelName="3" top={15*mainHeight/550} left={70*mainWidth/986}/>
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 4"] : 0} labelName="4" top={110*mainHeight/550} left={15*mainWidth/986}/>
                                    <CondeNode labelValue={this.state.levelsData.length>0 ? this.state.levelsData[this.state.currentDate+4]["Conde 5"] : 0} labelName="5" top={110*mainHeight/550} left={70*mainWidth/986}/>
                                </div>
                            </div>
                            <div className="col-2" style={{paddingTop: (mainHeight - 63)/4, paddingLeft:20, paddingRight:10}}>
                                <ImgButton imgSrc={tank} imgLabel=""/>
                                <div style={{height:(mainHeight - 63)/14}}></div>
                                <ImgButton imgSrc={tank} imgLabel=""/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <img src={track} alt="track" style={{ position:"absolute", left: mainWidth/3, bottom:10}}/>
                <div className="BlueRect" style={{ width:16*mainWidth/986, height:16*mainWidth/986, left: (mainWidth/3 + 95*mainWidth/986), bottom:20*mainHeight/550}}/>
                <div className="BlueRect" style={{ width:16*mainWidth/986, height:16*mainWidth/986, left: (mainWidth/3 + 125*mainWidth/986), bottom:20*mainHeight/550}}/>
                <div className="BlueRect" style={{ width:16*mainWidth/986, height:16*mainWidth/986, left: (mainWidth/3 + 155*mainWidth/986), bottom:20*mainHeight/550}}/>
                <div className="BlueRect" style={{ width:16*mainWidth/986, height:16*mainWidth/986, left: (mainWidth/3 + 155*mainWidth/986), bottom:50*mainHeight/550}}/>
                <div className="BlueRect" style={{ width:16*mainWidth/986, height:16*mainWidth/986, left: (mainWidth/3 + 155*mainWidth/986), bottom:80*mainHeight/550}}/>
                <div className="BlueRect" style={{ width:16*mainWidth/986, height:16*mainWidth/986, left: (mainWidth/3 + 155*mainWidth/986), bottom:110*mainHeight/550}}/>
                <Button primary={true}  style={{position:"absolute", bottom:10, left:10*mainWidth/986, backgroundColor:"#00bfff",borderColor:"#00bfff", fontSize:16*mainWidth/986}}>Current State</Button>
                <Button primary={true} style={{position:"absolute", bottom:10, left:130*mainWidth/986, backgroundColor:"#696969",borderColor:"#696969",fontSize:16*mainWidth/986}} onClick={this.props.goAddScenarios }>Add Scenarios</Button>
            </div>
            
        );
        
    }
}
export default CurrentStateScreen;