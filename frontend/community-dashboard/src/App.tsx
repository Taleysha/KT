import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard, Alerts, SafeHavens, Resources } from './features';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/safe-havens" component={SafeHavens} />
        <Route path="/resources" component={Resources} />
      </Switch>
    </Router>
  );
};
