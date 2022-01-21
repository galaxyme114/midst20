import React, {Component} from 'react';

class StarNode extends Component {
    render(){
        return (
            <div className={this.props.className } style={{ fontSize:parseInt(this.props.radius), left: parseInt(this.props.left), top: parseInt(this.props.top)}} >
              <h5 style={{left:parseInt(-this.props.radius), top: this.props.radius*3/5, width:parseInt(this.props.radius *2) }} onMouseEnter={() => {this.props.onNodeOver(this.props.label)}}>{this.props.label}</h5>
            </div>
            
        );
        
    }
}
export default StarNode;