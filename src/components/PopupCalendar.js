import React, {Component} from 'react';
import { Calendar } from '@progress/kendo-react-dateinputs';
class PopupCalendar extends Component {
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
    dateChanged = (e) => {
        let date= e.value.getDate() + "/" + (e.value.getMonth() + 1) + "/" + (e.value.getYear() + 1900)
        this.props.itemClick(date)
    }
    render(){
        
        return (
            <div ref={this.ref} className="PopupCalendar" style={{ left: (this.props.width -342)/2, top: (this.props.height - 302)/2}}>
                <Calendar onChange={this.dateChanged}/>
            </div>
            
        );
        
    }
}
export default PopupCalendar;