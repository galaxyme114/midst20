import React, {Component} from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import ImgButton from '../components/ImgButton';
import sussex from '../image/Sussex.png';
import atken from '../image/Atken.png';
import bulb from '../image/bulb.png';
import track from '../image/track.png';
import ship from '../image/ship.png';
import tank from '../image/tank_one.png';
import {
    Chart,
    ChartArea,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem
  } from '@progress/kendo-react-charts';
import API from '../api'

class ScenariosScreen extends Component {
    
    constructor(props) {
        super(props);
        let tmpData = [ "All Weeks" ];
        for (let i=1; i<=51; i++){
            tmpData.push(i+"");
        }
        this.state = {
            weeksData: tmpData,
            assetsData: ["All Assets"],
            weeksChartYValue: [],
            weeksChartXValue:[],
            assetsChartYValue: [],
            assetsChartXValue:[]
        }
    }
    componentDidMount() {
        API.get(`scenarios/`)
        .then(res => {
            const tmpData = res.data
            this.setState({
                assetsData: this.state.assetsData.concat(tmpData.assets),
                weeksChartYValue: tmpData.weeks_y_val,
                weeksChartXValue: tmpData.weeks_x_val,
                assetsChartYValue: tmpData.assets_y_val,
                assetsChartXValue: tmpData.assets_x_val
            })
        })
    }
    changeWeeks = (e) =>{
        let tmp = e.value
        if (e.value === "All Weeks"){
            tmp = 0
        }
        API.get(`scenarios-week/`+tmp)
        .then(res => {
            this.setState({
                weeksChartYValue: res.data.weeks_y_val,
                weeksChartXValue: res.data.weeks_x_val
            })
        })
    }
    changeAssets = (e) =>{
        API.post(`scenarios-asset/`, { asset: e.value })
        .then(res => {
            this.setState({
                assetsChartYValue: res.data.assets_y_val,
                assetsChartXValue: res.data.assets_x_val
            })
        })
    }
    imgBtnClick = (val) => {
        
    }
    render(){
        let mainWidth = this.props.mainWidth;
        let mainHeight = this.props.mainHeight;
        
        return (
            <div className="DealsScreen" style={{height:(mainHeight - 63)}}>
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
                    <div className="GridBack row" style={{height:(mainHeight - 69), width:mainWidth*0.74}}>
                        <div className="col-2" style={{paddingTop:3}}>
                            <div className="row" style={{float:"right"}}>
                                <DropDownList data={this.state.weeksData} defaultValue="All Weeks" style={{ width: 100}} onChange={this.changeWeeks}/>
                            </div>
                            <div className="row" style={{ paddingTop: mainHeight*0.4, float:"right"}}>
                                <DropDownList data={this.state.assetsData} defaultValue="All Assets" style={{ width: 100}} onChange={this.changeAssets}/>
                            </div>
                            
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <Chart style={{height:(mainHeight - 79)/2, width:mainWidth*0.74, padding:3}}>
                                    <ChartTitle text="SYSTEM VOLUMES" color="#fff" font="18pt sans-serif"/>
                                    
                                    <ChartArea background="#000" />
                                    <ChartLegend labels={{ color: '#fff' }}/>
                                    <ChartValueAxis >
                                        <ChartValueAxisItem color="#fff" majorGridLines={{color: "#fff"}} line={{visible:false}}/>
                                    </ChartValueAxis>
                                    <ChartCategoryAxis >
                                        <ChartCategoryAxisItem categories={this.state.weeksChartXValue} color="#fff"/>
                                    </ChartCategoryAxis>
                                    <ChartSeries >
                                        <ChartSeriesItem type="column"  data={this.state.weeksChartYValue} name="Series" color="#418cf0"/>
                                    </ChartSeries>
                                </Chart>
                            </div>
                            <div className="row">
                                <Chart style={{height:(mainHeight - 69)/2, width:mainWidth*0.74, padding:3}}>
                                    <ChartTitle text="SYSTEM VOLUMES" color="#fff" font="18pt sans-serif"/>
                                    
                                    <ChartArea background="#000" />
                                    <ChartLegend labels={{ color: '#fff' }}/>
                                    <ChartValueAxis >
                                        <ChartValueAxisItem color="#fff" majorGridLines={{color: "#fff"}} line={{visible:false}}/>
                                    </ChartValueAxis>
                                    <ChartCategoryAxis >
                                        <ChartCategoryAxisItem categories={this.state.assetsChartXValue} color="#fff" labels={{rotation:-45,step: 2,}}/>
                                    </ChartCategoryAxis>
                                    <ChartSeries >
                                        <ChartSeriesItem type="column"  data={this.state.assetsChartYValue} name="Series" color="#418cf0"/>
                                    </ChartSeries>
                                </Chart>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default ScenariosScreen;