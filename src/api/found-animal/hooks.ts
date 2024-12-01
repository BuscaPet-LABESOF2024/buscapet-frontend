import { useMutation } from '@tanstack/react-query';
import { FoundApi } from '.';
import { CreateFoundAnnouncementPayload } from './types';

export const useCreateFoundAnnouncement = () => {
  return useMutation({
    mutationFn: (payload: CreateFoundAnnouncementPayload) => FoundApi.createFoundAnnouncement(payload),
  });
};
