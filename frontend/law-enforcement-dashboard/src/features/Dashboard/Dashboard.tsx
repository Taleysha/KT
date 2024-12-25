import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { AlertList, CriminalList, Statistics } from './components';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <AlertList />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Statistics />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};