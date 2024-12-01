import { useMutation } from '@tanstack/react-query';
import { LostApi } from '.';
import { CreateLostAnnouncementPayload } from './types';

export const useCreateLostAnnouncement = () => {
  return useMutation({
    mutationFn: (payload: CreateLostAnnouncementPayload) => LostApi.createLostAnnouncement(payload),
  });
};
