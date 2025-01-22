import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import CommunityDashboard from './features/Dashboard/Dashboard';
import PublicAlerts from './components/PublicAlerts';
import SafeHavenList from './components/SafeHavenList';
import CommunityResources from './features/CommunityResources';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep blue
    },
    secondary: {
      main: '#c62828', // Deep red
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard" component={CommunityDashboard} />
            <Route path="/alerts" component={PublicAlerts} />
            <Route path="/safe-havens" component={SafeHavenList} />
            <Route path="/resources" component={CommunityResources} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;