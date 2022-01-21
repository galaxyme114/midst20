import React, {Component} from 'react';
import StarNode from '../components/StarNode';
import ElipseNode from '../components/ElipseNode';
import LineNode from '../components/LineNode';

class MainScreen extends Component {
    
    render(){
        let mainHeight = this.props.mainHeight;
        let mainWidth = this.props.mainWidth;
        let lineBlueItems = [];
        let lineRedItems = [];
        let dashRedItems = [];
        let lineGreenItems = [];
        let elipseItems = [];
        let starItems = [];
        let elipsePoints = [[460,654,28],[587, 701, 15], [460, 481, 20],
        [506,439,20],[592, 605, 15], [595, 553, 20],
        [676,509,20],[828, 435, 20], [828, 510, 20],
        [826,622,20],[834, 673, 15], [868, 651, 15],
        [1021,602,20],[919, 435, 20], [1059, 435, 15],
        [1106,435,14],[1169, 435, 15], [1106, 619, 15],
        [1233,435,20],[1233, 363, 15], [1115, 363, 15],
        [1077,275,16],[1001, 275, 16]];

        let elipseTexts = [ "andromeda", "Arcturu", "Auila", "Cassioeia", "Ursaminor", "Aquarius",
        "Aries", "Gemini", "Mensa", "UrsaMajor", "Leo","Libra", "Perseus", "Virgo","AlphaCentarui", "Preidus",
        "Hercules","Pegasue", "Ophiuchus", "Noyesl","Orion", "Gemini2", "Gemini1"];
        let starPoints = [[330,630,70],[408,696,60],[506,698,60],
        [741,540,60],[822,540,60],[858,585,60],
        [937,285,32],[939,243,32],[1021,285,32],[1065,300,32]];

        let starTexts = ["Sagittarius", "Beta", "Alpha", "A1", "A2", "A3", "3", "1", "4", "2"];

        let lineBlueOrd = [ [ 394, 653, 441, 651 ], [ 503, 651, 577, 691 ], [ 458, 500, 469, 625  ], [ 494, 632, 576, 612 ],
        [592, 596, 596, 570],[521, 449, 580, 535 ],
        [476, 464, 490, 450],[610, 612, 805, 623],[852, 621, 999, 602],
        [889, 653, 1019, 620],[849, 509, 1023, 578],[1037, 585, 1158, 447],
        [1180, 447, 1218, 453],[1216, 419, 1218, 366],[842, 525, 842, 604 ],
        [833, 640, 840, 659],[840, 659, 856, 655]];
        
        let lineRedOrd = [[483,477,576,548],[619,548,661,523],[698,510,806,510],
        [692,492,806,435],[828,491,828,456],[847,435,898,435],
        [842,492,905,451],[941,435,1044,435],[790,544, 814,524],
        [826,530,826,598],[848,623,857,644],[884,644,1006,615],
        [849,574,1009,585],[1043,602,1094,619],[1106,604,1106,449],
        [1116,608,1170,450],[1070,435,1095,435],[1120,435,1157,435],
        [1183,435,1211,435],[1232,415,1232,376],[1067,424,1104,375],
        [1120,352,1218,218],[1017,275,1064,275],[1091,275,1175,275],
        [1243,351,1243,335],[1036,325,1135,325],[1080,260,1080,202]];

        let lineGreenoOrd = [[462,458,538,305],[506,418,538,305],[538,305,1221,302],
        [1221,352,1221,275],[1151,313,1250,313]];

        let dashRedOrd =[[ 788, 557, 828, 557 ]];

        for (let i = 0; i < elipsePoints.length; i++) {
            elipseItems.push(<ElipseNode key={i} radius={elipsePoints[i][2] *1.4* mainWidth/986} label={elipseTexts[i]} left={(elipsePoints[i][0]-333)*mainWidth/986} top={(730-elipsePoints[i][1])*mainHeight/550} onNodeOver={this.props.onMouseOver} onNodeClick={this.props.onClick}/>);
        }
        for (let i = 0; i < starPoints.length; i++) {
            starItems.push(<StarNode className="Star" key={i} radius={starPoints[i][2]*0.45* mainWidth/986} label={starTexts[i]} left={(starPoints[i][0]-310)*mainWidth/986} top={(700-starPoints[i][1])*mainHeight/550} onNodeOver={this.props.onMouseOver}/>);
        }

        for (let i = 0; i < lineBlueOrd.length; i++) {
            lineBlueItems.push(<LineNode lineType="LineBlue" key={i}  x1={(lineBlueOrd[i][0]-310)*mainWidth/986} x2={(lineBlueOrd[i][2]-310)*mainWidth/986} y1={(748-lineBlueOrd[i][1])*mainHeight/550} y2={(748-lineBlueOrd[i][3])*mainHeight/550}/>);
        }
        for (let i = 0; i < lineRedOrd.length; i++) {
            lineRedItems.push(<LineNode lineType="LineRed" key={i} x1={(lineRedOrd[i][0]-310)*mainWidth/986} x2={(lineRedOrd[i][2]-310)*mainWidth/986} y1={(748-lineRedOrd[i][1])*mainHeight/550} y2={(748-lineRedOrd[i][3])*mainHeight/550}/>);
        }
        for (let i = 0; i < lineGreenoOrd.length; i++) {
            lineGreenItems.push(<LineNode lineType="LineGreen" key={i} x1={(lineGreenoOrd[i][0]-310)*mainWidth/986} x2={(lineGreenoOrd[i][2]-310)*mainWidth/986} y1={(748-lineGreenoOrd[i][1])*mainHeight/550} y2={(748-lineGreenoOrd[i][3])*mainHeight/550}/>);
        }
        for (let i = 0; i < dashRedOrd.length; i++) {
            dashRedItems.push(<LineNode lineType="LineRedDash" key={i} x1={(dashRedOrd[i][0]-310)*mainWidth/986} x2={(dashRedOrd[i][2]-310)*mainWidth/986} y1={(748-dashRedOrd[i][1])*mainHeight/550} y2={(748-dashRedOrd[i][3])*mainHeight/550}/>);
        }
        return (
            <div className="MainScreen">
                
                {/* Zeta 0 line */}
                <LineNode lineType="LineRedDash" x1={mainWidth-130 * mainWidth/986} x2={mainWidth-80 * mainWidth/986} y1={20*mainHeight/550} y2={20*mainHeight/550}/>
                <span style={{left:(mainWidth-70 * mainWidth/986), top:(10*mainHeight/550)}}>Zeta 0</span>
                <LineNode lineType="LineBlue" x1={mainWidth-130 * mainWidth/986} x2={mainWidth-80 * mainWidth/986} y1={40*mainHeight/550} y2={40*mainHeight/550}/>
                <span style={{left:(mainWidth-70 * mainWidth/986), top:(30*mainHeight/550)}}>Zeta 1</span>
                <LineNode lineType="LineRed" x1={mainWidth-130 * mainWidth/986} x2={mainWidth-80 * mainWidth/986} y1={60*mainHeight/550} y2={60*mainHeight/550}/>
                <span style={{left:(mainWidth-70 * mainWidth/986), top:(50*mainHeight/550)}}>Zeta 2</span>
                <LineNode lineType="LineLime" x1={mainWidth-130 * mainWidth/986} x2={mainWidth-80 * mainWidth/986} y1={80*mainHeight/550} y2={80*mainHeight/550}/>
                <span style={{left:(mainWidth-70 * mainWidth/986), top:(70*mainHeight/550)}}>Zeta 3</span>
                
                <StarNode radius={14 * mainWidth/986} left={mainWidth-120 * mainWidth/986} top={100*mainHeight/550} className="StarGray"/>
                <span style={{left:(mainWidth-70 * mainWidth/986), top:(105*mainHeight/550)}}>Premi</span>
                <StarNode radius={14 * mainWidth/986} left={mainWidth-120 * mainWidth/986} top={140*mainHeight/550} className="Star"/>
                <span style={{left:(mainWidth-70 * mainWidth/986), top:(145*mainHeight/550)}}>Secondi</span>
                <LineNode lineType="LineBlueDash" x1={0} x2={mainWidth} y1={mainHeight*3/4} y2={mainHeight*3/4}/>
                {dashRedItems}
                {lineBlueItems}
                {lineRedItems}
                {lineGreenItems}
                {elipseItems}
                {starItems}
                
            </div>
        );
    }
}
export default MainScreen;