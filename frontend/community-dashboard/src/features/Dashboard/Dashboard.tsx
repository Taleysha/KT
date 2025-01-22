import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Chip,
  useTheme,
  Avatar,
} from '@mui/material';
import {
  Notifications,
  LocationOn,
  Info,
  Share,
  Phone,
  Security,
  Warning,
  ArrowForward,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Mock Data
const safetyData = [
  { name: 'Safe Zones', value: 65 },
  { name: 'Watch Areas', value: 25 },
  { name: 'Alert Zones', value: 10 },
];

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

// Types for DashboardCard props
type DashboardCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

// DashboardCard Component
const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, children, action }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const CommunityDashboard: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Community Safety Overview
          </Typography>
          <Typography color="text.secondary">
            Stay informed about your neighborhood's safety status
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Warning />} color="error" sx={{ height: 'fit-content' }}>
          Report Incident
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Safety Status */}
        <Grid item xs={12} md={8}>
          <DashboardCard title="Neighborhood Safety Status" subtitle="Real-time safety metrics for your area">
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={safetyData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {safetyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
                  85%
                </Typography>
                <Typography variant="body1">Overall Safety Score</Typography>
              </Box>
            </Box>
          </DashboardCard>
        </Grid>

        {/* Emergency Contacts */}
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Emergency Contacts"
            action={
              <IconButton color="primary">
                <Share />
              </IconButton>
            }
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="outlined" color="error" startIcon={<Phone />} size="large">
                Emergency: 911
              </Button>
              <Button variant="outlined" startIcon={<Security />} size="large">
                Local Police
              </Button>
              <Button variant="outlined" startIcon={<Info />} size="large">
                Community Watch
              </Button>
            </Box>
          </DashboardCard>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12}>
          <DashboardCard
            title="Recent Community Alerts"
            action={
              <Button endIcon={<ArrowForward />} color="primary">
                View All
              </Button>
            }
          >
            <Grid container spacing={2}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} key={item}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Notifications />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">Suspicious Activity Report</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <LocationOn sx={{ fontSize: 16, verticalAlign: 'text-bottom' }} />
                        Oak Street, 2 hours ago
                      </Typography>
                    </Box>
                    <Chip label="Active" color="warning" size="small" />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunityDashboard;
