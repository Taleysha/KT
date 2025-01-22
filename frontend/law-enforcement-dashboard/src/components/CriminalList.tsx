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
import axios from 'axios';

interface Criminal {
  id: number;
  first_name: string;
  last_name: string;
  criminal_id: string;
  risk_level: string;
  status: string;
}

const CriminalList: React.FC = () => {
  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/criminals/');
        setCriminals(response.data);
      } catch (error) {
        console.error('Error fetching criminals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCriminals();
  }, []);

  const getRiskLevelChip = (level: string) => {
    const colors = {
      high: theme.palette.error.main,
      medium: theme.palette.warning.main,
      low: theme.palette.success.main
    };
    
    return (
      <Chip
        label={level.toUpperCase()}
        size="small"
        sx={{
          backgroundColor: `${colors[level.toLowerCase() as keyof typeof colors]}15`,
          color: colors[level.toLowerCase() as keyof typeof colors],
          fontWeight: 500,
        }}
      />
    );
  };

  const getStatusChip = (status: string) => {
    const colors = {
      active: theme.palette.error.main,
      detained: theme.palette.warning.main,
      released: theme.palette.success.main
    };
    
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: `${colors[status.toLowerCase() as keyof typeof colors]}15`,
          color: colors[status.toLowerCase() as keyof typeof colors],
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
        Criminal Records
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Risk Level</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {criminals.map((criminal) => (
              <TableRow 
                key={criminal.id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: theme.palette.action.hover,
                    cursor: 'pointer'
                  }
                }}
              >
                <TableCell>{criminal.criminal_id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{`${criminal.first_name} ${criminal.last_name}`}</TableCell>
                <TableCell>{getRiskLevelChip(criminal.risk_level)}</TableCell>
                <TableCell>{getStatusChip(criminal.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CriminalList;