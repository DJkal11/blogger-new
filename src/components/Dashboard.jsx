import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import { Link, useHistory, Switch } from "react-router-dom";
import Compose from "./Compose";
import Blogs from "./Blogs";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../components/Auth";
import UpdateProfile from "./UpdateProfile";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Blogs', href: '/Blogs', current: false },
  { name: 'Compose', href: '/Compose', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')

}

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

    

      <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                 <h1 className="text-white text-3xl">Blogger</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={handleLogout}
                >
                  <span className="sr-only">View notifications</span>
                  Sign Out
                </button>

                {/* Profile dropdown */}
               
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                
                  <Link key={item.name} to={item.href} className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}>
                   {item.name}
                  </Link>
                  
               
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>


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


    </Router>
  );
}

export default Dashboard;
