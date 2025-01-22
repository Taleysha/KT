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
  Link,
  useTheme
} from '@mui/material';
import { 
  LocalHospital,
  School,
  Security,
  SupportAgent
} from '@mui/icons-material';
import axios from 'axios';

interface CommunityResource {
  id: number;
  title: string;
  description: string;
  category: string;
  contact_info: {
    phone?: string;
    email?: string;
  };
  url?: string;
  is_active: boolean;
}

const CommunityResources: React.FC = () => {
  const [resources, setResources] = useState<CommunityResource[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:8000/community-resources/');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'emergency':
        return <LocalHospital color="error" />;
      case 'education':
        return <School color="primary" />;
      case 'support':
        return <SupportAgent color="info" />;
      default:
        return <Security color="action" />;
    }
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
        Community Resources
      </Typography>
      <List>
        {resources.map((resource) => (
          <ListItem
            key={resource.id}
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
              {getCategoryIcon(resource.category)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {resource.title}
                  </Typography>
                  <Chip
                    label={resource.category}
                    size="small"
                    sx={{
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main
                    }}
                  />
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {resource.description}
                  </Typography>
                  {resource.url && (
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      Learn More
                    </Link>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommunityResources;