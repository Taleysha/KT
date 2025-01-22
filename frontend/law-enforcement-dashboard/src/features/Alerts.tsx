import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';

const Alerts: React.FC = () => {
  return (
    <Container maxWidth="lg" className="p-4">
      <Typography variant="h4" gutterBottom>
        Alerts
      </Typography>
      <Paper className="p-4">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Recent Alerts</Typography>
            {/* Add your alert components here */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Alerts;
