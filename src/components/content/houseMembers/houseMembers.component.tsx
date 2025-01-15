import React from 'react';
import { Typography } from '@mui/material';
import { NO_HOUSE_MEMBERS } from '../../../constants/common';
import { CharacterStatus } from '../characterStatus/characterStatus.component';
import { MembersComponentProps } from './houseMembers.types';
import { LoadingComponent } from '../../loading/loading.component';

export const HouseMembers = ({
  isLoading,
  swornMembers,
  houseSwornMembers
}: MembersComponentProps) => {
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!houseSwornMembers.length) {
    return <Typography variant="body2">{NO_HOUSE_MEMBERS}</Typography>;
  }

  return (
    <>
      {houseSwornMembers.map((url, memberIndex) => {
        const member = swornMembers?.find((m) => m.url === url);
        return (
          <div className="pb-2">
            <Typography key={memberIndex} variant="body2">
              {member?.name || 'Unknown'} <CharacterStatus died={member?.died} />
            </Typography>
          </div>
        );
      })}
    </>
  );
};
