import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContactInquiryDto } from '../backend';

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInquiryDto[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      company: string | null;
      phone: string;
      email: string;
      serviceNeeded: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.upsertInquiry(
        data.name,
        data.company,
        data.phone,
        data.email,
        data.serviceNeeded,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
