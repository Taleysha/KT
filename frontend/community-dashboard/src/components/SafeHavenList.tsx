import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  Box,
  CircularProgress,
  useTheme
} from '@mui/material';
import { Home, Phone, Schedule } from '@mui/icons-material';
import axios from 'axios';

interface SafeHaven {
  id: number;
  name: string;
  address: string;
  contact_info: {
    phone: string;
    email?: string;
  };
  status: string;
  operating_hours: {
    weekday: string;
    weekend: string;
  };
}

const SafeHavenList: React.FC = () => {
  const [safeHavens, setSafeHavens] = useState<SafeHaven[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchSafeHavens = async () => {
      try {
        const response = await axios.get('http://localhost:8000/safe-havens/');
        setSafeHavens(response.data);
      } catch (error) {
        console.error('Error fetching safe havens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafeHavens();
  }, []);

  const getStatusChip = (status: string) => {
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: status.toLowerCase() === 'open' 
            ? theme.palette.success.main + '15'
            : theme.palette.error.main + '15',
          color: status.toLowerCase() === 'open' 
            ? theme.palette.success.main
            : theme.palette.error.main,
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
        Safe Havens
      </Typography>
      <List>
        {safeHavens.map((haven) => (
          <ListItem 
            key={haven.id}
            sx={{ 
              mb: 2, 
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#eeeef0'
              }
            }}
          >
            <ListItemIcon>
              <Home color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {haven.name}
                  </Typography>
                  {getStatusChip(haven.status)}
                </Box>
              }
              secondary={
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body2">{haven.contact_info.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="body2">
                      Weekday: {haven.operating_hours.weekday} | Weekend: {haven.operating_hours.weekend}
                    </Typography>
                  </Box>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SafeHavenList;