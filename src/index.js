import React, { Component } from 'react';
import { GoaliesDataProvider } from './context/goalies.context';
import Routers from './routes/Routing';
export default class App extends Component {
  render() {
    return (
      <GoaliesDataProvider>
        <Routers />
      </GoaliesDataProvider>
    );
  }
}
