import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { useSwornMembers } from '../../hooks/useSwornMembers';
import { HouseCard } from './houseCard/houseCard.component';
import { useHouses } from '../../hooks/useHouses';
import { LoadingComponent } from '../loading/loading.component';
import { HOUSES_ERROR } from '../../constants/common';

export const ContentComponent = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: housesData,
    isLoading: isLoadingHouses,
    error: housesError
  } = useHouses(page, itemsPerPage);

  const swornMembersUrls = housesData?.data.flatMap((house) => house.swornMembers) || [];
  const { data: swornMembers, isLoading: isLoadingMembers } = useSwornMembers(swornMembersUrls);

  if (isLoadingHouses || isLoadingMembers) {
    return (
      <Box
        className="bg-[#111827] p-4 min-h-screen"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}>
        <LoadingComponent />
      </Box>
    );
  }

  if (housesError) {
    return <Box className="bg-[#111827] p-4 min-h-screen">{HOUSES_ERROR}</Box>;
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box className="bg-[#111827] p-4 min-h-screen">
      {housesData?.data.map((house, index) => (
        <HouseCard
          key={index}
          house={house}
          swornMembers={swornMembers || []}
          isLoading={isLoadingMembers}
        />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Pagination
          count={housesData?.totalPages || 1}
          page={page}
          onChange={handlePageChange}
          sx={{
            '.MuiPaginationItem-root': {
              color: '#F59E0A'
            },
            '.Mui-selected': {
              backgroundColor: '#9b9b9b',
              color: '#000000'
            }
          }}
        />
      </Box>
    </Box>
  );
};
