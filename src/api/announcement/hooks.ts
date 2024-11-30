import { useQuery } from '@tanstack/react-query';
import { AnnouncementApi } from '.';
import type { FilterFormSchemaType } from '@/components/all-announcements/types';

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => AnnouncementApi.getAnnouncements(),
  });
}

export function useGetAnnouncementsWithFilter(
  filters: FilterFormSchemaType
) {
  return useQuery({
    queryKey: ['announcements', filters],
    queryFn: () => AnnouncementApi.getAnnouncementsWithFilter(filters),
  });
}

export function useGetLastAnnouncements() {
  return useQuery({
    queryKey: ['last-announcements'],
    queryFn: () => AnnouncementApi.getLastAnnouncements(),
  });
}
