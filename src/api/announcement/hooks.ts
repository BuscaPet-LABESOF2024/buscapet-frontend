import { useMutation, useQuery } from '@tanstack/react-query';
import { AnnouncementApi } from '.';
import {
  CreateAdoptionAnnouncementPayload,
  CreateLostAnnouncementPayload,
} from './types';

export function useGetAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => AnnouncementApi.getAnnouncements(),
  });
}

export const useCreateAdoptionAnnouncement = () => {
  return useMutation({
    mutationFn: (payload: CreateAdoptionAnnouncementPayload) =>
      AnnouncementApi.createAdoption(payload),
  });
};

export const useCreateLostAnnouncementPayload = () => {
  return useMutation({
    mutationFn: (payload: CreateLostAnnouncementPayload) =>
      AnnouncementApi.createLostAnnouncement(payload),
  });
};
