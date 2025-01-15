import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const LoadingComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};
