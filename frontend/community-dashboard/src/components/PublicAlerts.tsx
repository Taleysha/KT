import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const PublicAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/public/alerts/');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertChip = (type: string) => {
    const iconMap = {
      warning: <Warning />,
      error: <ErrorIcon />,
      info: <Info />
    };

    return (
      <Chip
        icon={iconMap[type.toLowerCase() as keyof typeof iconMap]}
        label={type}
        size="small"
        sx={{
          backgroundColor: `${theme.palette[type.toLowerCase() as 'warning' | 'error' | 'info'].main}15`,
          color: theme.palette[type.toLowerCase() as 'warning' | 'error' | 'info'].main,
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
        Public Alerts
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{getAlertChip(alert.alert_type)}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{alert.title}</TableCell>
                <TableCell>{alert.description}</TableCell>
                <TableCell>{typeof alert.location === 'object' ? JSON.stringify(alert.location) : alert.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PublicAlerts;