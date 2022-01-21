import React, {Component} from 'react';
import sussex from '../image/Sussex.png';
import atken from '../image/Atken.png';
import bulb from '../image/bulb.png';
import track from '../image/track.png';
import ship from '../image/ship.png';
import tank from '../image/tank_one.png';
import ImgButton from '../components/ImgButton';

class VolumeScreen extends Component {
    render(){
        
        return (
            <div className="VolumeScreen" style={{height:(this.props.mainHeight - 63)}}>
                <div className="row" style={{ paddingTop: (this.props.mainHeight - 63)/5, paddingBottom:(this.props.mainHeight - 63)/20}}>
                    <div className="col-2"></div>
                    <div className="col-2">
                        <ImgButton imgSrc={atken} imgLabel="Atken" onClick={ this.props.onClick }/>
                    </div>
                    <div className="col-2">
                        <ImgButton imgSrc={atken} imgLabel="Goldy" onClick={ this.props.onClick }/>
                    </div>
                    <div className="col-2" style={{ paddingTop: (this.props.mainHeight - 63)/13}}>
                        <ImgButton imgSrc={bulb} imgLabel="" onClick={ this.props.onClick }/>
                    </div>
                    <div className="col-2" style={{ paddingTop: (this.props.mainHeight - 63)/13}}>
                        <ImgButton imgSrc={track} imgLabel="" onClick={ this.props.onClick }/>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: (this.props.mainHeight - 63)/20}}>
                    <div className="col-2"></div>
                    <div className="col-2">
                        <ImgButton imgSrc={atken} imgLabel="Blair" onClick={ this.props.onClick }/>
                    </div>
                    <div className="col-2">
                        <ImgButton imgSrc={sussex} imgLabel="Sussex" onClick={ this.props.onClick }/>
                    </div>
                    <div className="col-2">
                        <ImgButton imgSrc={tank} onClick={ this.props.onClick }/>
                    </div>
                    <div className="col-2">
                        <ImgButton imgSrc={ship} onClick={ this.props.onClick }/>
                    </div>
                </div>
            </div>
            
        );
        
    }
}
export default VolumeScreen;