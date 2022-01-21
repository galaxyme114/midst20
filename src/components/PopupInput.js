import React, {Component} from 'react';
import { Button} from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs'
class PopupInput extends Component {
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
    keyDown = (e) => {
        if (e.key === "Enter"){
            this.props.itemClick(e.target.value)
        }
    }
    render(){
        let width = parseFloat(this.props.width)
        return (
            <div ref={this.ref} className="PopupButton" style={{width:width, left:parseFloat(this.props.left)}}>
                <ul>
                    <li>
                        <Button onClick={()=>this.props.itemClick(this.props.title)}>{this.props.title}</Button>
                    </li>
                    <li>
                        <Input  onKeyPress={this.keyDown}/>
                    </li>
                    
                </ul>
            </div>
            
        );
        
    }
}
export default PopupInput;