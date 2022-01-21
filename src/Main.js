import React, {Component} from 'react';

import '@progress/kendo-theme-default/dist/all.css';
import 'bootstrap-4-grid/css/grid.min.css';
import {
  Chart,
  ChartArea,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem
} from '@progress/kendo-react-charts';
import { Popup } from '@progress/kendo-react-popup'
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs'
import './App.css';
import StatusBar from './components/StatusBar';
import MainScreen from './screen/MainScreen';
import MenuHeader from './components/MenuHeader';
import VolumeScreen from './screen/VolumeScreen';
import CurrentStateScreen from './screen/CurrentStateScreen';
import AddScenariosScreen from './screen/AddScenariosScreen';
import DealsScreen from './screen/DealsScreen';
import ScenariosScreen from './screen/ScenariosScreen';
import ExecScreen from './screen/ExecScreen';
import AdditionScreen from './screen/AdditionScreen'
import API from './api';

const seriesSystemData = [500, 0, 900, 0, 600, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const seriesHighestData = [300, 500, 700, 900, 600, 1000];
const categoriesHighestData = ["Series1", "Series2", "Series3", "Series4", "Series5", "Series6"]
class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      height: 768, 
      width: 1280,
      mainStatus: "MAIN",
      menuStatus: "Home",
      lblNodeStatus: "andromeda",
      isShowSystemChart: false,
      isShowHighestChart: false,
      isSettingsDlg: false,
      host: "",
      port: "",
      username: "",
      password: ""
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  
  
  componentDidMount() {
    if (!localStorage.getItem("refresh_token")){
      this.props.history.push('/login/');
    }
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions, false);
    document.addEventListener("click", this.handleClickOutside, false);
    API.get(`get-settings/`)
    .then(res => {
        const tmpData = JSON.parse(res.data.settings)
        this.setState({
          host: tmpData[0]["host"],
          port: tmpData[0]["port"],
          username: tmpData[0]["user"],
          password: tmpData[0]["password"],
        })
    })
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions, false);
    document.removeEventListener("click", this.handleClickOutside, false);
  }
  handleClickOutside(e){
    if (this.state.isShowSystemChart === true && ( e.pageX > this.state.width*0.45 + 10 || e.pageY < this.state.height * 0.55)){
      this.setState({isShowSystemChart:false});
    }
    if (this.state.isShowHighestChart === true && ( e.pageX < this.state.width*0.2 || e.pageX > this.state.width*0.65 || e.pageY < this.state.height * 0.54)){
      this.setState({isShowHighestChart:false});
    }
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth >= 1280 ? window.innerWidth : 1280, height: window.innerHeight >= 768 ? window.innerHeight : 768 });
  }
  systemChartClick = () =>{
    console.log("aaaa");
    this.setState({isShowSystemChart:true});
  };
  hightestChartClick = () =>{
    this.setState({isShowHighestChart:true});
  };
  onNodeOver = (val) =>{
    this.setState({
      lblNodeStatus : val,
    });
  }
  onNodeClick = (val) =>{
    if(val === "andromeda"){
      this.setState({
        lblNodeStatus : val,
        mainStatus: "VOLUMES",
        menuStatus: "Assets",
      });
    }
  }
  changeMainStatus = (val) => {
    let tempMenuStatus = "";
    if (val === "VOLUMES"){
      tempMenuStatus = "Assets";
    }else if (val==="SCENARIOS"){
      tempMenuStatus = "Scenarios";
    }else if (val==="DEALS"){
      tempMenuStatus = "Deals";
    }else if (val==="ADDITIONS"){
      tempMenuStatus = "Additions";
    }
    if (this.state.mainStatus !== "MAIN"){
      this.setState({
        mainStatus: val,
        menuStatus: tempMenuStatus,
      });
    }
    
  };
  async handleLogout() {
    try {
        const response = await API.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        API.defaults.headers['Authorization'] = null;
        this.props.history.push('/login/');
        return response;
    }
    catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        API.defaults.headers['Authorization'] = null;
        this.props.history.push('/login/');
        console.log(e);
    }

}
  menuClick = (val) => {
    if (val === "Settings"){
      this.setState({
        isSettingsDlg: true
      })
    }else if(val === "Logout"){
      this.handleLogout();
    }else{
      let tempMainStatus = "";
      if (val === "Home"){
        tempMainStatus = "MAIN";
      }else if (val === "Exec" || val === "Scenarios"){
        tempMainStatus = "SCENARIOS";
      }else if (val === "Assets"){
        tempMainStatus = "VOLUMES";
      }else if (val === "Deals"){
        tempMainStatus = "DEALS";
      }else if (val === "Additions"){
        tempMainStatus = "ADDITIONS";
      }
      this.setState({
        mainStatus: tempMainStatus,
        menuStatus: val,
      });
    }
    
  }
  onSussexClick = (val) =>{
    if (val === "Sussex"){
      this.setState({
        menuStatus: "CurrentState",
      });
    }
    
  }
  goAddScenarios = () => {
    this.setState({
      mainStatus: "SCENARIOS",
      menuStatus: "AddScenarios",
    })
  }
  goCurrentState = () => {
    this.setState({
      mainStatus: "VOLUMES",
      menuStatus: "CurrentState",
    })
  }

  // setting dlg
  setDlgClose = () => {
    
    this.setState({
      isSettingsDlg:false
    })
  }
  setDlgSave = () => {
    API.post(`change-settings/`,
    {
      host: this.state.host,
      port: this.state.port,
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
        
    })
    this.setState({
      isSettingsDlg:false
    })
  }
  render(){
    
    let offsetSetDlg = { left: (this.state.width - 400)/2, top: (this.state.height-420)/2 };
    let offsetSystem = { left: 10, top: this.state.height*0.54 };
    let offsetHighest = { left: this.state.width*0.2, top: this.state.height*0.54 };
    let mainPanel;
    if (this.state.mainStatus === "MAIN"){
      mainPanel = <MainScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} onMouseOver={ this.onNodeOver } onClick={ this.onNodeClick }/>;
    }else{
      if (this.state.mainStatus === "VOLUMES"){
        if (this.state.menuStatus === "Assets"){
          mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus={ this.state.menuStatus } onMenuClick={ this.menuClick }/>
            <VolumeScreen mainHeight={ this.state.height*3/4} onClick={ this.onSussexClick }/>
          </div>
        }else if(this.state.menuStatus === "CurrentState"){
          mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus="Assets" onMenuClick={ this.menuClick }/>
            <CurrentStateScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} goAddScenarios={ this.goAddScenarios }/>
          </div>
        }
      }else if (this.state.mainStatus === "SCENARIOS"){
        if (this.state.menuStatus === "AddScenarios"){
          mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus="Scenarios" onMenuClick={ this.menuClick }/>
            <AddScenariosScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} goCurrentState={ this.goCurrentState }/>
          </div>
        }else if (this.state.menuStatus === "Scenarios"){
          mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus={ this.state.menuStatus } onMenuClick={ this.menuClick }/>
            <ScenariosScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} />
          </div>
        }else if (this.state.menuStatus === "Exec"){
          mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus={ this.state.menuStatus } onMenuClick={ this.menuClick }/>
            <ExecScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} />
          </div>
        }
      }else if(this.state.mainStatus === "ADDITIONS"){
        mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus={ this.state.menuStatus } onMenuClick={ this.menuClick }/>
            <AdditionScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} />
          </div>
      }else{
        mainPanel = <div>
            <MenuHeader mainStatus={ this.state.mainStatus } menuStatus={ this.state.menuStatus } onMenuClick={ this.menuClick }/>
            <DealsScreen mainWidth={this.state.width*0.83} mainHeight={ this.state.height*3/4} />
          </div>
      }
      
    }
    
    return (
      <div className="App" style={{ height: this.state.height, width: this.state.width}}>
        <div className="row">
          <div className="LeftSide" style={{ width: this.state.width*0.17, height: this.state.height*3/4 }}>
            <h1 className={this.state.mainStatus === "DEALS" ? "TransBack" : ""}  onClick={() => this.changeMainStatus("DEALS")}>DEALS</h1>
            <h1 className={this.state.mainStatus === "SCENARIOS" ? "TransBack" : ""}  onClick={() => this.changeMainStatus("SCENARIOS")}>SCENARIOS</h1>
            <h1 className={this.state.mainStatus === "VOLUMES" ? "TransBack" : ""} onClick={() => this.changeMainStatus("VOLUMES")}>VOLUMES</h1>
            <h1 className={this.state.mainStatus === "ADDITIONS" ? "TransBack" : ""} onClick={() => this.changeMainStatus("ADDITIONS")}>ADDITIONS</h1>
            <h3>{ this.state.lblNodeStatus }</h3>
            <div className="StatusDiv">
              <StatusBar label="Speed" value="123" linePos="20%"></StatusBar>
              <StatusBar label="Volume" value="345" linePos="50%"></StatusBar>
              <StatusBar label="Transit Rate" value="567" linePos="60%"></StatusBar>
            </div>
          </div>
          <div style={{ width: this.state.width*0.83, height: this.state.height*3/4 }}>
            {mainPanel}
            
          </div>
        </div>
        {/* Bottom Side */}
        <div className="BottomSide" style={{ width: this.state.width, height:this.state.height*0.25 }}>
          <div className="row">
            {/* System Volumes part */}
            <div style={{ width: this.state.width*0.3}} onClick={() => this.systemChartClick()}>
              <Chart style={{height:this.state.height*0.245, padding:3}}>
                <ChartTitle text="SYSTEM VOLUMES" color="#fff" font="18pt sans-serif"/>
                
                <ChartArea background="#000" />
                <ChartLegend labels={{ color: '#fff' }}/>
                <ChartValueAxis >
                    <ChartValueAxisItem color="#fff" majorGridLines={{color: "#fff"}} line={{visible:false}}/>
                </ChartValueAxis>
                <ChartCategoryAxis >
                    <ChartCategoryAxisItem  color="#fff"/>
                </ChartCategoryAxis>
                <ChartSeries >
                    <ChartSeriesItem type="column"  data={seriesSystemData} name="Series" color="#418cf0"/>
                </ChartSeries>
              </Chart>
            </div>
            {/* Highest Volumes part */}
            <div style={{ width: this.state.width*0.3}} onClick={() => this.hightestChartClick()}>
              <Chart style={{height:this.state.height*0.245, padding:3}}>
                <ChartTitle text="HIGHEST VOLUMES" color="#fff" font="18pt sans-serif"/>
                
                <ChartArea background="#000" />
                <ChartLegend labels={{ color: '#fff' }}/>
                <ChartValueAxis >
                    <ChartValueAxisItem color="#fff" majorGridLines={{color: "#fff"}}  line={{visible:false}}/>
                </ChartValueAxis>
                <ChartCategoryAxis >
                    <ChartCategoryAxisItem categories={categoriesHighestData} color="#fff"/>
                </ChartCategoryAxis>
                <ChartSeries >
                    <ChartSeriesItem type="bar"  data={seriesHighestData} name="Series" color="#418cf0"/>
                </ChartSeries>
              </Chart>
            </div>
            <div className="row" style={{ width: this.state.width*0.36, paddingTop:40}}>
              <div className="row">
                <div style={{ width: this.state.width*0.16}}>
                  <h2>System Status</h2>
                </div>
                <div style={{ width: this.state.width*0.2}}>
                  <div style={{ paddingTop:12}}>
                    <StatusBar linePos="50%"></StatusBar>
                  </div>
                </div>
              </div>
              <div className="LogoPlace">
                <h2>Logo PlaceHolder</h2>
                
              </div>
            </div>
          </div>
        </div>
        <Popup
          offset={ offsetSystem }
          show={this.state.isShowSystemChart}
          popupClass={'popup-content'}
          animate={false}
        >
          <div style={{ width: this.state.width*0.45}}>
            <Chart style={{height:this.state.height*0.45, padding:3}}>
              <ChartTitle text="SYSTEM VOLUMES" color="#fff" font="18pt sans-serif"/>
              
              <ChartArea background="#000" />
              <ChartLegend labels={{ color: '#fff' }}/>
              <ChartValueAxis >
                  <ChartValueAxisItem color="#fff" majorGridLines={{color: "#fff"}} line={{visible:false}}/>
              </ChartValueAxis>
              <ChartCategoryAxis >
                  <ChartCategoryAxisItem  color="#fff"/>
              </ChartCategoryAxis>
              <ChartSeries >
                  <ChartSeriesItem type="column"  data={seriesSystemData} name="Series" color="#418cf0"/>
              </ChartSeries>
            </Chart>
          </div>  
        </Popup>
        <Popup
          offset={ offsetHighest }
          show={this.state.isShowHighestChart}
          popupClass={'popup-content'}
          animate={false}
        >
          <div style={{ width: this.state.width*0.45}}>
            <Chart style={{height:this.state.height*0.45, padding:3}}>
              <ChartTitle text="HIGHEST VOLUMES" color="#fff" font="18pt sans-serif"/>
              
              <ChartArea background="#000" />
              <ChartLegend labels={{ color: '#fff' }}/>
              <ChartValueAxis >
                  <ChartValueAxisItem color="#fff" majorGridLines={{color: "#fff"}}  line={{visible:false}}/>
              </ChartValueAxis>
              <ChartCategoryAxis >
                  <ChartCategoryAxisItem categories={categoriesHighestData} color="#fff"/>
              </ChartCategoryAxis>
              <ChartSeries >
                  <ChartSeriesItem type="bar"  data={seriesHighestData} name="Series" color="#418cf0"/>
              </ChartSeries>
            </Chart>
          </div>  
        </Popup>
        <Popup
          offset={ offsetSetDlg }
          show={this.state.isSettingsDlg}
          popupClass={'popup-content'}
          animate={false}
          style={{backgroundColor: "#656565"}}
        >
          <div className="setting-dlg" style={{ width: 450}}>
              <h1 >CAS Server Setting</h1>
              <div className="row set-row">
                <div className="col-5">
                  <h2>Host</h2>
                </div>
                <div className="col-7">
                  <Input value={this.state.host} onChange={(e)=>{ 
                    this.setState({
                      host: e.target.value
                    })
                  }}/>
                </div>
              </div>
              <div className="row set-row">
                <div className="col-5">
                  <h2>Port</h2>
                </div>
                <div className="col-7">
                  <Input value={this.state.port}  onChange={(e)=>{ 
                    this.setState({
                      port: e.target.value
                    })
                  }}/>
                </div>
              </div>
              <div className="row set-row">
                <div className="col-5">
                  <h2>User Name</h2>
                </div>
                <div className="col-7">
                  <Input value={this.state.username} onChange={(e)=>{ 
                    this.setState({
                      username: e.target.value
                    })
                  }}/>
                </div>
              </div>
              <div className="row set-row">
                <div className="col-5">
                  <h2>Password</h2>
                </div>
                <div className="col-7">
                  <Input type="password" value={this.state.password}  onChange={(e)=>{ 
                    this.setState({
                      password: e.target.value
                    })
                  }}/>
                </div>
              </div>
              <div className="row set-row">
                <div className="col-3"></div>
                <div className="col-3 btn-dlg">
                  <Button  onClick={this.setDlgSave}>Save</Button>
                </div>
                <div className="col-3 btn-dlg">
                  <Button  onClick={this.setDlgClose}>Cancel</Button>
                </div>  
              </div>
          </div>  
        </Popup>
      </div>
    );
    
  }
  
}

export default Main;
