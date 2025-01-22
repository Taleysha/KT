import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  CircularProgress,
  Chip,
  useTheme
} from '@mui/material';
import {
  Security,
  Home,
  PersonOutline,
  Info
} from '@mui/icons-material';
import axios from 'axios';

interface SafetyTip {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  priority_level: number;
}

const SafetyTips: React.FC = () => {
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get('http://localhost:8000/safety-tips/');
        setTips(response.data);
      } catch (error) {
        console.error('Error fetching safety tips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'personal_safety':
        return <PersonOutline color="primary" />;
      case 'home_security':
        return <Home color="secondary" />;
      default:
        return <Security color="action" />;
    }
  };

  const getPriorityChip = (level: number) => {
    const colors = {
      1: theme.palette.error,
      2: theme.palette.warning,
      3: theme.palette.info
    };
    const labels = {
      1: 'High Priority',
      2: 'Medium Priority',
      3: 'General Tip'
    };

    return (
      <Chip
        label={labels[level as keyof typeof labels]}
        size="small"
        sx={{
          backgroundColor: colors[level as keyof typeof colors].main + '15',
          color: colors[level as keyof typeof colors].main
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
        Safety Tips
      </Typography>
      <List>
        {tips.map((tip) => (
          <ListItem
            key={tip.id}
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
              {getCategoryIcon(tip.category)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {tip.title}
                  </Typography>
                  {getPriorityChip(tip.priority_level)}
                </Box>
              }
              secondary={
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {tip.content}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SafetyTips;