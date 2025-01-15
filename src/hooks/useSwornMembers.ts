import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { SwornMemberType } from '../types/swornMember/swornMember.types';

const fetchSwornMembers = async (urls: string[]): Promise<SwornMemberType[]> => {
  const responses = await Promise.all(
    urls.map(async (url) => {
      const etag = localStorage.getItem(`${url}-etag`);
      const lastModified = localStorage.getItem(`${url}-last-modified`);

      try {
        const response = await apiClient.get(url, {
          headers: {
            ...(etag && { 'If-None-Match': etag }),
            ...(lastModified && { 'If-Modified-Since': lastModified })
          }
        });

        if (response.headers.etag) {
          localStorage.setItem(`${url}-etag`, response.headers.etag);
        }
        if (response.headers['last-modified']) {
          localStorage.setItem(`${url}-last-modified`, response.headers['last-modified']);
        }

        return response.data;
      } catch (error: any) {
        if (error.response?.status === 304) {
          console.log(`Data for ${url} is unchanged (304 Not Modified).`);
          return null;
        }
        throw error;
      }
    })
  );

  return responses.filter((data) => data !== null);
};

export const useSwornMembers = (urls: string[]) => {
  return useQuery<SwornMemberType[], Error>({
    queryKey: ['swornMembers', urls],
    queryFn: () => fetchSwornMembers(urls),
    enabled: urls.length > 0,
    staleTime: 4 * 60 * 60 * 1000
  });
};
