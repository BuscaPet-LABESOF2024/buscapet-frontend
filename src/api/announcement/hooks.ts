import { useQuery } from '@tanstack/react-query';
import { AnnouncementApi } from '.';
import { FilterFormSchemaType } from '@/components/all-announcements/types';

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => AnnouncementApi.getAnnouncements(),
  });
}

export function useGetAnnouncementsWithFilter(params: GetAnnouncementsWithFilterParams) {
  return useQuery({
    queryKey: ['announcements', params],
    queryFn: () => AnnouncementApi.getAnnouncementsWithFilter(params),
  });
}

export function useGetLastAnnouncements() {
  return useQuery({
    queryKey: ['last-announcements'],
    queryFn: () => AnnouncementApi.getLastAnnouncements(),
  });
}
export function useGetMyAnnouncements() {
  return useQuery({
    queryKey: ['myAnnouncements'],
    queryFn: () => AnnouncementApi.getMyAnnouncements(),
  });
}

export interface GetAnnouncementsWithFilterParams {
  filters: FilterFormSchemaType;
  pageNumber?: number;
  size?: number;
}
