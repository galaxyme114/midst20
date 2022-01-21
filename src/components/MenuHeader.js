import React, {Component} from 'react';

import assets_tool from '../image/Sussex_tool.png';
import embaros_tool from '../image/embaros.png';
import deals_tool from '../image/deals.png';
import scenarios_tool from '../image/scenarios.png';
import exec_tool from '../image/exc.png';
import setting_tool from '../image/setting.png';
import home_tool from '../image/home.png';
import logout1 from '../image/logout1.png';

class MenuHeader extends Component {
    render(){
        return (
            <div className="MenuHeader">
                <div className="row">
                    <div className="col-3 lblHeader">
                        <h1>{ this.props.mainStatus }</h1>
                    </div>
                    <div className="col-9 row lblBody">
                        <div className="col-2">
                            <span className={ this.props.menuStatus==="Assets"? "active": ""}>Assets</span>
                            <img src={assets_tool} alt="Assets" onClick={()=>{ this.props.onMenuClick("Assets") }}/>
                        </div>
                        <div className="col-2">
                            <span className={ this.props.menuStatus==="Embaros"? "active": ""}>Embaros</span>
                            <img src={embaros_tool} alt="Embaros" />
                        </div>
                        <div className="col-2">
                            <span className={ this.props.menuStatus==="Deals"? "active": ""}>Deals</span>
                            <img src={deals_tool} alt="Deals" onClick={()=>{ this.props.onMenuClick("Deals") }}/>
                        </div>
                        <div className="col-2">
                            <span className={ this.props.menuStatus==="Scenarios"? "active": ""}>Scenarios</span>
                            <img src={scenarios_tool} alt="Scenarios" onClick={()=>{ this.props.onMenuClick("Scenarios") }}/>
                        </div>
                        <div className="col-2">
                            <span className={ this.props.menuStatus==="Exec"? "active": ""}>Exec</span>
                            <img src={exec_tool} alt="Exec" onClick={()=>{ this.props.onMenuClick("Exec") }}/>
                        </div>
                        <div className="col-2 row">
                            <div className="col-3">
                                <img src={setting_tool} alt="Settings"  onClick={()=>{ this.props.onMenuClick("Settings") }}/>
                            </div>
                            <div className="col-6">
                                <img src={home_tool} alt="Go Home" onClick={()=>{ this.props.onMenuClick("Home") }}/>
                            </div>
                            <div className="col-3">
                                <img src={logout1} alt="logout" onClick={()=>{ this.props.onMenuClick("Logout") }}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                
            </div>
            
        );
        
    }
}
export default MenuHeader;