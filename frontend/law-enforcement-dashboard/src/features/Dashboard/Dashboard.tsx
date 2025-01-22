import React, { useState, ReactNode } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Chip,
  useTheme,
  LinearProgress
} from '@mui/material';
import {
  Refresh,
  NotificationsActive,
  Search,
  FilterList,
  MoreVert,
  KeyboardArrowUp,
  Warning
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with actual data
const activityData = [
  { time: '00:00', incidents: 5 },
  { time: '04:00', incidents: 3 },
  { time: '08:00', incidents: 8 },
  { time: '12:00', incidents: 12 },
  { time: '16:00', incidents: 15 },
  { time: '20:00', incidents: 10 }
];

// Define prop types for DashboardCard component
interface DashboardCardProps {
  title: string;
  action: ReactNode;
  children: ReactNode;
  priority?: 'normal' | 'high';
}

const DashboardCard = ({ title, action, children, priority = 'normal' }: DashboardCardProps) => {
  const theme = useTheme();

  return (
    <Card sx={{
      height: '100%',
      borderLeft: priority === 'high' ? `4px solid ${theme.palette.error.main}` : 'none',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[4]
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState(0);
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Command Center
          </Typography>
          <Typography color="text.secondary">
            Real-time law enforcement operations overview
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Active Incidents">
            <IconButton color="error">
              <NotificationsActive />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search Records">
            <IconButton>
              <Search />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Time Range Selector */}
      <Tabs value={timeRange} onChange={(_, val) => setTimeRange(val)} sx={{ mb: 3 }}>
        <Tab label="Live View" />
        <Tab label="Last 24 Hours" />
        <Tab label="This Week" />
        <Tab label="This Month" />
      </Tabs>

      <Grid container spacing={3}>
        {/* Priority Incidents */}
        <Grid item xs={12} md={8}>
          <DashboardCard
            title="Active Incidents"
            priority="high"
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Filter">
                  <IconButton size="small">
                    <FilterList />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More">
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke={theme.palette.error.main}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </DashboardCard>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DashboardCard title="Active Units" action={<div />} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    24
                  </Typography>
                  <Chip
                    icon={<KeyboardArrowUp />}
                    label="+3 from last shift"
                    color="success"
                    size="small"
                  />
                </Box>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  75% coverage of designated areas
                </Typography>
              </DashboardCard>
            </Grid>
            <Grid item xs={12}>
              <DashboardCard
                title="Critical Alerts"
                priority="high"
                action={
                  <Chip
                    icon={<Warning />}
                    label="2 New"
                    color="error"
                    size="small"
                  />
                }
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: 'error.contrastText' }}>
                      Armed Robbery in Progress
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'error.contrastText' }}>
                      Location: Downtown District
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: 'warning.contrastText' }}>
                      Multiple Vehicle Collision
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'warning.contrastText' }}>
                      Location: Highway 101
                    </Typography>
                  </Box>
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
