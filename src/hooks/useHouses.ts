import { HouseType } from '../types/house/house.types';
import apiClient from '../api/apiClient';
import { useQuery } from '@tanstack/react-query';

interface FetchHousesResponse {
  data: HouseType[];
  totalPages: number;
}

const fetchHouses = async (page: number, pageSize: number): Promise<FetchHousesResponse> => {
  console.log(`Fetching houses for page: ${page}, pageSize: ${pageSize}`);

  const cacheKey = `houses-page-${page}-pageSize-${pageSize}`;

  const etag = localStorage.getItem(`${cacheKey}-etag`);
  const lastModified = localStorage.getItem(`${cacheKey}-last-modified`);

  try {
    const response = await apiClient.get<HouseType[]>(`/houses?page=${page}&pageSize=${pageSize}`, {
      headers: {
        ...(etag && { 'If-None-Match': etag }),
        ...(lastModified && { 'If-Modified-Since': lastModified })
      }
    });

    if (response.headers.etag) {
      localStorage.setItem(`${cacheKey}-etag`, response.headers.etag);
    }
    if (response.headers['last-modified']) {
      localStorage.setItem(`${cacheKey}-last-modified`, response.headers['last-modified']);
    }

    const linkHeader = response.headers.link;

    let totalPages = 1;

    if (linkHeader) {
      const links = linkHeader.split(',');
      const lastLink = links.find((link: string) => link.includes('rel="last"'));

      if (lastLink) {
        const match = lastLink.match(/page=(\d+)/);
        if (match) {
          totalPages = parseInt(match[1], 10);
        }
      } else {
        console.warn('No link found with rel="last"');
      }
    } else {
      console.warn('No Link header');
    }

    return {
      data: response.data,
      totalPages
    };
  } catch (error: any) {
    // Handle 304 Not Modified response
    if (error.response?.status === 304) {
      return {
        data: [],
        totalPages: 1
      };
    }
    throw error;
  }
};

export const useHouses = (page: number, pageSize: number) => {
  return useQuery<FetchHousesResponse>({
    queryKey: ['houses', page, pageSize],
    queryFn: () => fetchHouses(page, pageSize),
    staleTime: 4 * 60 * 60 * 1000
  });
};
