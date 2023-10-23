import React from 'react';
import Service from '../Services/Service';

export const SeasonContext = React.createContext();

export const getSeason = async () => {
  let season = '';
  const service = new Service();

  const res = await service.getCurrentSeason();
  if (res.data && res.data.seasons && res.data.seasons.length > 0) {
    season = res.data.seasons[0].seasonId;
  }

  return season;
};
