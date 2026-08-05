import {
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
} from "@tanstack/react-query";

type LikeState = {
  id: string;
  count: number;
  likedByMe: boolean;
};

type UseToggleLikeArgs<T extends LikeState> = {
  id: string;
  liked: boolean;
  queryKey: QueryKey;
  options: UseMutationOptions<T, Error, void>;
  invalidateKeys?: QueryKey[];
};

export function useToggleLike<T extends LikeState>({
  id,
  liked,
  queryKey,
  options,
  invalidateKeys,
}: UseToggleLikeArgs<T>) {
  const qc = useQueryClient();

  return useMutation({
    ...options,
    onSuccess: (likeResponse) => {
      qc.setQueryData<T>(queryKey, (prevLikeState) => {
        if (likeResponse) return likeResponse;

        const count = prevLikeState?.count ?? 0;

        return {
          ...prevLikeState,
          id: prevLikeState?.id ?? id,
          count: liked ? count + 1 : Math.max(0, count - 1),
          likedByMe: liked,
        } as T;
      });

      invalidateKeys?.forEach((key) =>
        qc.invalidateQueries({ queryKey: key }),
      );
    },
  });
}
