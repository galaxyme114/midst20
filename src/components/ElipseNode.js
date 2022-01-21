import React, {Component} from 'react';

class ElipseNode extends Component {
    render(){
        return (
            <div className="Elipse" style={{ width:parseInt(this.props.radius * 2), height:parseInt(this.props.radius * 2 * 0.7), left: parseInt(this.props.left), top: parseInt(this.props.top)}} onClick={() => {this.props.onNodeClick(this.props.label)}}>
              <h5 style={{width:parseInt(this.props.radius *2) }} onMouseEnter={() => {this.props.onNodeOver(this.props.label)}} >{this.props.label}</h5>
            </div>
            
        );
        
    }
}
export default ElipseNode;