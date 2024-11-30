import { useQuery } from '@tanstack/react-query';
import { AnnouncementApi } from '.';

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => AnnouncementApi.getAnnouncements(),
  });
}

export function useGetMyAnnouncements() {
  return useQuery({
    queryKey: ['myAnnouncements'],
    queryFn: () => AnnouncementApi.getMyAnnouncements(),
  });
}