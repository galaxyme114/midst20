import React, {Component} from 'react';

class ImgButton extends Component {
    render(){
        return (
            <div className="ImgButton" onClick={()=> {this.props.onClick(this.props.imgLabel)}}>
                <img src={this.props.imgSrc} alt={this.props.imgLabel} />
                <span>{ this.props.imgLabel }</span>
            </div>
            
        );
        
    }
}
export default ImgButton;