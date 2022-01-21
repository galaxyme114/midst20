import React, { Component} from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";

import Main from "./Main";

class App extends Component {
    
    render() {
        return (
            <Switch>
                <Route exact path={"/login/"} component={Login}/>
                <Route exact path={"/"} component={Main}/>
                
            </Switch>
        );
    }
}

export default App;