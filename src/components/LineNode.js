import React, {Component} from 'react';

class LineNode extends Component {
    
    render(){
        let degree = parseInt(Math.atan((parseInt(this.props.y2) - parseInt(this.props.y1))/(parseInt(this.props.x2) - parseInt(this.props.x1)))*180/Math.PI);
        let length = parseInt(Math.sqrt(Math.pow((parseInt(this.props.x2) - parseInt(this.props.x1)), 2) + Math.pow((parseInt(this.props.y2) - parseInt(this.props.y1)), 2)));
        return (
            <div className={this.props.lineType} style={{ width: length, left: parseInt(this.props.x1), top: parseInt(this.props.y1), transform: "rotate("+ degree +"deg)"}}>
              
            </div>
        );
        
    }
}
export default LineNode;