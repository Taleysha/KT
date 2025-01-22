import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  CircularProgress,
  useTheme
} from '@mui/material';
import { Warning, Info, Error as ErrorIcon } from '@mui/icons-material';
import axios from 'axios';

interface Alert {
  id: number;
  alert_type: string;
  title: string;
  description: string;
  location: any;
  created_at: string;
}

const AlertList: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/alerts/');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warning':
        return <Warning sx={{ color: theme.palette.warning.main }} />;
      case 'error':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <Info sx={{ color: theme.palette.info.main }} />;
    }
  };

  const getAlertChip = (type: string) => {
    return (
      <Chip
        icon={getAlertIcon(type)}
        label={type}
        size="small"
        sx={{
          backgroundColor: `${theme.palette[type.toLowerCase() === 'error' ? 'error' : type.toLowerCase() === 'warning' ? 'warning' : 'info'].main}15`,
          color: theme.palette[type.toLowerCase() === 'error' ? 'error' : type.toLowerCase() === 'warning' ? 'warning' : 'info'].main,
          fontWeight: 500,
        }}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
        Recent Alerts
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow 
                key={alert.id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: theme.palette.action.hover 
                  }
                }}
              >
                <TableCell>{getAlertChip(alert.alert_type)}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{alert.title}</TableCell>
                <TableCell>{alert.description}</TableCell>
                <TableCell>{JSON.stringify(alert.location)}</TableCell>
                <TableCell>
                  {new Date(alert.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AlertList;