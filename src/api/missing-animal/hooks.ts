import { useMutation } from '@tanstack/react-query';
import { LostApi } from '.';
import { CreateLostAnnouncementPayload } from './types';

export const useCreateLostAnnouncementPayload = () => {
  return useMutation({
    mutationFn: (payload: CreateLostAnnouncementPayload) => LostApi.createLostAnnouncement(payload),
  });
};
