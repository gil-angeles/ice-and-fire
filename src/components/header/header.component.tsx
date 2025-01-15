import React from 'react';
import { HOUSES_OF_WESTEROS } from '../../constants/common';

export const HeaderComponent = () => {
  return (
    <div className="bg-[#111827] text-[#F59E0A] h-16 w-full flex items-center px-4 border-b-4 border-[#2C3A4A]">
      <h1 className="text-2xl font-bold">{HOUSES_OF_WESTEROS}</h1>
    </div>
  );
};
