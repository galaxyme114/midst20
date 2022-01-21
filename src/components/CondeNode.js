import React, {Component} from 'react';
import conde from '../image/conde.png';
class CondeNode extends Component {
    render(){
        return (
            <div className="CondeNode" style={{top:parseInt(this.props.top), left: parseInt(this.props.left)}}>
                <img src={conde} alt={this.props.labelName} />
                <div className="lblLabel">
                    <p>{ this.props.labelValue }</p>
                </div>
                <span>C<sub>{ this.props.labelName }</sub></span>
            </div>
            
        );
        
    }
}
export default CondeNode;