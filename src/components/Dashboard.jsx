import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import { Link, useHistory, Switch } from 'react-router-dom';
import Compose from "./Compose";
import Blogs from "./Blogs";
import { Button, Alert} from "react-bootstrap";
import {useAuth} from "../components/Auth"
import UpdateProfile from "./UpdateProfile";


function Dashboard(){
const [error, setError ] = useState("");
const {currentUser, logout} = useAuth();
const history = useHistory();





 async function handleLogout() {
 setError("");

 try {
   await logout();
   history.push("/login");
 } catch{
   setError("failed to logout")
 }
  }

  
    return (
        <Router>
        <div >
          <nav className="Nav">
          <a className="brand" href="/">Blogger</a>
            <ul>
              <li>
                <Link className="Nav-item" to="/Blogs">Home</Link>
              </li>
              <li>
                <Link className="Nav-item" to="/Compose">Compose</Link>
              </li>
             
              <li>
              <strong>Email:</strong> {currentUser.email}
              </li>
            </ul>
          </nav>
        {error && <Alert variant="danger">{error}</Alert>}
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/Compose">
              <Compose />
            </Route>
            <Route path="/Blogs">
              <Blogs />
            </Route>
            <Route path="/update-profile">
              <UpdateProfile />
            </Route>
          </Switch>
        </div>
       
       <footer>
          sauce code
       </footer>

        <div className="logout">
     <Button onClick={handleLogout} variant="contained" className="btn btn-primary">
        Logout
      </Button>
     </div>
     
      </Router> 
    )
}

export default Dashboard;