import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthenticateRoute  } from './helpers';
import { AdminPage } from './modules/AdminPage';
import { LoginPage } from './modules/LoginPage';
import { RegisterPage } from './modules/RegisterPage';



function App() {
  
  return (
      <div className="app-screen-container">
          <div className="container">
              <div className="col-md-8 offset-md-2">
                  {/* <Router history={history}> */}
                      <Switch>
                        <AuthenticateRoute exact path="/" component={AdminPage} />
                        <AuthenticateRoute exact path="/user/admin" component={AdminPage} />
                        <AuthenticateRoute exact path="/user/user" component={AdminPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Redirect from="*" to="/" />
                      </Switch>
                  {/* </Router> */}
              </div>
          </div>
      </div>
  );
}

export default App;
