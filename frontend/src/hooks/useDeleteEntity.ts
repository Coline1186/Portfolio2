import { toast } from "sonner";

export function useDeleteEntity(
  deleteMutation: (options: { variables: { id: string } }) => Promise<void>,
  refetch: () => void,
  label: string,
) {
  return async (id: string) => {
    if (!confirm(`Supprimer ${label} ?`)) return;

    try {
      await deleteMutation({ variables: { id } });
      toast.success(`${label} supprimé`);
      refetch();
    } catch {
      toast.error(`Erreur suppression ${label}`);
    }
  };
}
