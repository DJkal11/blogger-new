import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import { Switch } from 'react-router-dom';
import { AuthProvider } from "./components/Auth";
import Register from "./components/register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/privateRoute";
import UpdateProfile from "./components/UpdateProfile";
import BlogPage from "./components/blogPage";


function App() {



  return (
    
    
    <div className="App">
      <Router>
      <AuthProvider>
        <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/:id" component={BlogPage} />
        </Switch>
      </AuthProvider>
      </Router>
    </div>
    
    
  );
}

export default App;
