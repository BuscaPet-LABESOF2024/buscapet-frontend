import { useQuery } from '@tanstack/react-query';
import { AnnouncementApi } from '.';

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => AnnouncementApi.getAnnouncements(),
  });
}
