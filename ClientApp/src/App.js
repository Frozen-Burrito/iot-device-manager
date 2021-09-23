import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { DeviceCollection } from './pages/DeviceCollection';
import { AddDevice } from './pages/AddDevice';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/devices' component={DeviceCollection} />
        <Route exact path='/devices/add' component={AddDevice} />
      </Layout>
    );
  }
}
