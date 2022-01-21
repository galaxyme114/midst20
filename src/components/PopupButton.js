import React, {Component} from 'react';
import { Button} from '@progress/kendo-react-buttons';
class PopupButton extends Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    ref = React.createRef();
    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside, false);
    }
      
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, false);
    }
    handleClickOutside(e){
        if (this.ref.current && this.ref.current.contains(e.target)) {
            return;
        }
        this.props.outSideClick();
        
    }
    render(){
        let width = parseFloat(this.props.width)
        return (
            <div ref={this.ref} className="PopupButton" style={{width:width, left:parseFloat(this.props.left)}}>
                <ul>
                    <li>
                        <Button onClick={()=>this.props.itemClick(this.props.itemVal[0])}>{this.props.itemVal[0]}</Button>
                    </li>
                    <li>
                        <Button style={{color:"yellow"}} onClick={()=>this.props.itemClick(this.props.itemVal[1])}>{this.props.itemVal[1]}</Button>
                    </li>
                    <li>
                        <Button style={{color:"yellow"}} onClick={()=>this.props.itemClick(this.props.itemVal[2])}>{this.props.itemVal[2]}</Button>
                    </li>
                    <li>
                        <Button style={{color:"yellow"}} onClick={()=>this.props.itemClick(this.props.itemVal[3])}>{this.props.itemVal[3]}</Button>
                    </li>
                </ul>
            </div>
            
        );
        
    }
}
export default PopupButton;