import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { PublicAlerts, SafeHavenList, ResourceList } from './components';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <PublicAlerts />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <SafeHavenList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};