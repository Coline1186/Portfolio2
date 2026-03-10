import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ABOUT } from "../../requetes/queries/about.query";
import {
  DELETE_ABOUT,
  REORDER_ABOUTS,
} from "../../requetes/mutations/about.mutation";
import { toast } from "sonner";
import AddEditAbout from "./AddEditAbout";
import { useSortableEntities } from "@/hooks/useSortableEntities";
import SortableAdminTable from "@/layoutElements/SortableAdminTable";
import SortableAboutRow from "./SortableAboutRow";
import { TableHead, TableHeader, TableRow } from "@/ui/table";

type AboutQuery = {
  abouts: {
    id: string;
    position: number;
    image: string;
  }[];
};

function AboutManagement() {
  const { refetch, loading, error, data } = useQuery<AboutQuery>(GET_ABOUT);
  const { items: abouts, handleDragEnd } = useSortableEntities({
    data: data?.abouts,
    reorder: async (ids) => {
      await reorderAbouts({ variables: { ids } });
    },
  });
  const [reorderAbouts] = useMutation(REORDER_ABOUTS);
  const [deleteAbout] = useMutation(DELETE_ABOUT);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
      try {
        await deleteAbout({ variables: { deleteAboutId: id } });
        toast.success("Photo supprimée avec succès");
        refetch();
      } catch {
        toast.error("Erreur lors de la suppression de la photo");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;

  return (
    <div className="flex flex-col px-4 py-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
          Photos existantes
        </h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <div className="max-h-100 overflow-y-auto">
          <SortableAdminTable
            items={abouts}
            onDragEnd={handleDragEnd}
            header={
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left w-25 pr-1">Réorganiser</TableHead>
                  <TableHead className="text-left w-25 pr-1">Position</TableHead>
                  <TableHead className="text-left w-25 pr-1">Photo</TableHead>
                  <TableHead className="text-left w-25 pr-1">
                    Modifier
                  </TableHead>
                  <TableHead className="text-left w-25 pr-1">
                    Supprimer
                  </TableHead>
                </TableRow>
              </TableHeader>
            }
            renderRow={(about, index) => (
              <SortableAboutRow
                key={about.id}
                about={about}
                index={index}
                refetch={refetch}
                handleDelete={handleDelete}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-4">
        <AddEditAbout
          refetch={refetch}
          triggerLabel="Ajouter une nouvelle photo"
        />
      </div>
    </div>
  );
}

export default AboutManagement;
