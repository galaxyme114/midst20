import React, {Component} from 'react';

class StatusBar extends Component {
    render(){
        return (
            <div className="StatusBar">
                <h2>{this.props.label}</h2>
                <h3>{this.props.value}</h3>
                <div>
                    <div className="StatusImg">
                        <div className="LinePos" style={{ "left": this.props.linePos }}></div>
                    </div>
                    
                </div>
                
            </div>
            
        );
        
    }
}
export default StatusBar;