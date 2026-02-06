import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FireExtinguisherCertificateDto } from '../backend';

export function useGetAllCertificates() {
  const { actor, isFetching } = useActor();

  return useQuery<FireExtinguisherCertificateDto[]>({
    queryKey: ['certificates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCertificates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCertificateByToken(token: string) {
  const { actor, isFetching } = useActor();

  return useQuery<FireExtinguisherCertificateDto | null>({
    queryKey: ['certificate', token],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCertificateByToken(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useGetCertificateByNumber(certificateNumber: bigint, enabled: boolean = true) {
  const { actor, isFetching } = useActor();

  return useQuery<FireExtinguisherCertificateDto | null>({
    queryKey: ['certificate', 'number', certificateNumber.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCertificateByNumber(certificateNumber);
    },
    enabled: !!actor && !isFetching && enabled && certificateNumber > 0,
  });
}

export function useCreateCertificate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      clientName: string;
      clientAddress: string | null;
      extinguisherType: string;
      capacity: string;
      cylinderManufDate: string;
      installationDate: string;
      refillingDate: string;
      nextDueDate: string;
      refillingDoneBy: string;
      testedBy: string;
      certifiedBy: string;
      refillingCompany: string;
      remarks: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createCertificate(
        data.clientName,
        data.clientAddress,
        data.extinguisherType,
        data.capacity,
        data.cylinderManufDate,
        data.installationDate,
        data.refillingDate,
        data.nextDueDate,
        data.refillingDoneBy,
        data.testedBy,
        data.certifiedBy,
        data.refillingCompany,
        data.remarks
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
}

export function useUpdateCertificate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      certificateNumber: bigint;
      clientName: string;
      clientAddress: string | null;
      extinguisherType: string;
      capacity: string;
      cylinderManufDate: string;
      installationDate: string;
      refillingDate: string;
      nextDueDate: string;
      refillingDoneBy: string;
      testedBy: string;
      certifiedBy: string;
      refillingCompany: string;
      remarks: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateCertificate(
        data.certificateNumber,
        data.clientName,
        data.clientAddress,
        data.extinguisherType,
        data.capacity,
        data.cylinderManufDate,
        data.installationDate,
        data.refillingDate,
        data.nextDueDate,
        data.refillingDoneBy,
        data.testedBy,
        data.certifiedBy,
        data.refillingCompany,
        data.remarks
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({
        queryKey: ['certificate', 'number', variables.certificateNumber.toString()],
      });
    },
  });
}

export function useIsCallerAdmin(enabled: boolean = true) {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && enabled,
    retry: false,
  });
}
