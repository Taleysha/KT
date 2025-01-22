import React from 'react';
import { Container, Typography } from '@mui/material';
import CriminalList from '../components/CriminalList';

const CriminalRecords: React.FC = () => {
  return (
    <Container maxWidth="lg" className="p-4">
      <Typography variant="h4" gutterBottom>
        Criminal Records
      </Typography>
      <CriminalList />
    </Container>
  );
};

export default CriminalRecords;
