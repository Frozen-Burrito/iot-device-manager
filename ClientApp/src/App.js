import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Layout,
  HomePage,
  DeviceCollection,
  AddDevice,
  DeviceDetails
} from './pages';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/devices' component={DeviceCollection} />
            <Route exact path='/devices/add' component={AddDevice} />
            <Route path='/devices/:identifier' component={DeviceDetails} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
