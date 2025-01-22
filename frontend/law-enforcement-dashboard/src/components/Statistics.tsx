import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import {
  TrendingUp,
  Warning,
  Person,
  Timer
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        backgroundColor: `${color}10`,
        border: `1px solid ${color}30`,
        '&:hover': {
          backgroundColor: `${color}15`,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {value}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            p: 1,
            display: 'flex'
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { 
            sx: { color: color, fontSize: 24 } 
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export const Statistics: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
        System Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StatCard
            title="Active Cases"
            value="24"
            icon={<TrendingUp />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            title="Recent Alerts"
            value="12"
            icon={<Warning />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            title="Officers on Duty"
            value="8"
            icon={<Person />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            title="Response Time"
            value="15m"
            icon={<Timer />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;