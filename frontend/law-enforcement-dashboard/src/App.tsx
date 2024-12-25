import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard, CriminalRecords, Alerts, InterCountyComm } from './features';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/criminals" component={CriminalRecords} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/communication" component={InterCountyComm} />
      </Switch>
    </Router>
  );
};
