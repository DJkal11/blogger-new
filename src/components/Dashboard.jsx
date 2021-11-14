import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import { Link, useHistory, Switch } from "react-router-dom";
import Compose from "./Compose";
import Blogs from "./Blogs";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../components/Auth";
import UpdateProfile from "./UpdateProfile";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("failed to logout");
    }
  }

  return (
    <Router>
      <div>
        <nav className="text-white w-10 md:w-full">
          <ul className="flex flex-row text-3xl sm:text-4xl bg-gray-600">
            <li className="p-2 sm:p-4">Blogger</li>
            <li className="p-2 sm:p-4 hover:bg-gray-900">
              <Link className="no-underline text-white" to="/Blogs">
                Blogs
              </Link>
            </li>
            <li className="p-2 sm:p-4 hover:bg-gray-900">
              <Link
                className="no-underline text-white"
                to="/Compose"
              >
                Compose
              </Link>
            </li>

            <li className="p-2 sm:p-4">{currentUser.email}</li>
          </ul>
        </nav>

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

      <div className="logout">
        <Button
          onClick={handleLogout}
          variant="contained"
          className="btn btn-primary"
        >
          Logout
        </Button>
      </div>
    </Router>
  );
}

export default Dashboard;
