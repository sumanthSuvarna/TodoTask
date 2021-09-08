import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './auth/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Routing = () => {
    return(
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route path="/Home" component={Home} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    )
  }

   export default Routing;