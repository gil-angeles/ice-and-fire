import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { HouseMembers } from '../houseMembers/houseMembers.component';
import { HouseCardProps } from './houseCard.types';

export const HouseCard = ({ house, swornMembers, isLoading }: HouseCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#18202E',
        color: '#FFFFFF',
        marginBottom: '1rem',
        borderRadius: '8px'
      }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {house.name}
        </Typography>
        {house.words && (
          <Typography
            variant="body2"
            sx={{
              marginBottom: '0.5rem',
              color: 'grey',
              fontStyle: 'italic'
            }}>
            "{house.words}"
          </Typography>
        )}
        <HouseMembers
          isLoading={isLoading}
          swornMembers={swornMembers}
          houseSwornMembers={house.swornMembers}
        />
      </CardContent>
    </Card>
  );
};
