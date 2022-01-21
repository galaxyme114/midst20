import React, {Component} from 'react';
import ImgButton from '../components/ImgButton';
import sussex from '../image/Sussex.png';
import atken from '../image/Atken.png';
import bulb from '../image/bulb.png';
import track from '../image/track.png';
import ship from '../image/ship.png';
import tank from '../image/tank_one.png';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import API from '../api';

class DealsScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allData: []
        }
    }
    componentDidMount() {
        API.get(`deals/`)
        .then(res => {
            const dealsData = JSON.parse(res.data)
            this.setState({
                allData:dealsData
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
                    <div className="GridBack" style={{height:(mainHeight - 69), width:mainWidth*0.74}}>
                        <Grid data={this.state.allData} style={{height:(mainHeight - 69), backgroundColor:"#b6d3ed"}}>
                            <Column field="Asset" title="Asset"/>
                            <Column field="Producer" title="Producer" />
                            <Column field="Product" title="Product" />
                            <Column field="Volume" title="Volume" />
                            <Column field="Units" title="Units" />
                            <Column field="Duration" title="Duration" />
                            <Column field="Time Units" title="Time Units" />
                            <Column field="Start" title="Start" />
                            <Column field="End" title="End" />
                        </Grid>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default DealsScreen;