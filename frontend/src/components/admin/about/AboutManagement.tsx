import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ABOUT } from "../../../requetes/queries/about.query";
import { DELETE_ABOUT } from "../../../requetes/mutations/about.mutation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import AddEditAbout from "./AddEditAbout";
import { Button } from "../../../ui/button";

type AboutQuery = {
  abouts: {
    id: string;
    image: string;
  }[];
};

function AboutManagement() {
  const { refetch, loading, error, data } = useQuery<AboutQuery>(GET_ABOUT);
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
  return (
    <div className="flex flex-col px-4 py-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
          Photos existantes
        </h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <div className="max-h-100 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-25 pr-1">Photo</TableHead>
                <TableHead className="text-left w-25 pr-1">Modifier</TableHead>
                <TableHead className="text-left w-25 pr-1">Supprimer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableHead colSpan={3}>Chargement...</TableHead>
                </TableRow>
              )}

              {error && (
                <TableRow>
                  <TableHead colSpan={3}>Erreur de chargement</TableHead>
                </TableRow>
              )}
              {data?.abouts.map((about) => (
                <TableRow key={about.id}>
                  <TableHead className="text-left">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL_FILES}${about.image}`}
                      alt="Photo"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </TableHead>
                  <TableHead>
                    <AddEditAbout
                      refetch={refetch}
                      about={about}
                      triggerLabel="Modifier"
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      onClick={() => handleDelete(about.id)}
                      className="w-25"
                    >
                      Supprimer
                    </Button>
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
