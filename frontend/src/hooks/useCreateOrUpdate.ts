import { toast } from "sonner";

type MutationExecutor<TVariables> = (options: {
  variables: TVariables;
}) => Promise<unknown>;

type Options<TVariables, TEntity> = {
  entity?: TEntity;
  createMutation: MutationExecutor<TVariables>;
  updateMutation: MutationExecutor<TVariables>;
  buildVariables: (filename: string) => TVariables;
  refetch: () => void;
  successCreateMessage: string;
  successUpdateMessage: string;
};

export function useCreateOrUpdate<TVariables, TEntity = unknown>({
  entity,
  createMutation,
  updateMutation,
  buildVariables,
  refetch,
  successCreateMessage,
  successUpdateMessage,
}: Options<TVariables, TEntity>) {
  const handleSubmit = async (filename: string) => {
    try {
      const variables = buildVariables(filename);

      if (entity) {
        await updateMutation({ variables });
        toast.success(successUpdateMessage);
      } else {
        await createMutation({ variables });
        toast.success(successCreateMessage);
      }

      refetch();
    } catch {
      toast.error("Erreur lors de l’opération");
    }
  };

  return { handleSubmit };
}
