import React, {Component} from 'react';
import alton from '../image/alton.png';
class StoreNode extends Component {
    render(){
        return (
            <div className="StoreNode" style={{top:parseInt(this.props.top), left: parseInt(this.props.left)}}>
                <img src={alton} alt={this.props.labelName} />
                <div className="lblLabel">
                    <p>{ this.props.labelValue }</p>
                </div>
                <span>C<sub>{ this.props.labelName }</sub></span>
            </div>
            
        );
        
    }
}
export default StoreNode;