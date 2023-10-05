import { useQueryClient, useMutation } from 'react-query';

export const useCustomMutation = (mutateFunction, queryKey = '') => {
  const queryClient = useQueryClient();

  return useMutation((payload) => mutateFunction(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
