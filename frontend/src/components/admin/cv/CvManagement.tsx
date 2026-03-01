import { useMutation, useQuery } from "@apollo/client/react";
import { GET_SINGLE_CV } from "../../../requetes/queries/cv.query";
import { DELETE_CV } from "../../../requetes/mutations/cv.mutation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Button } from "../../../ui/button";
import AddEditCv from "./AddEditCv";

type Cv = {
  id: string;
  cv: string;
};

type CvQuery = {
  cv: Cv | null;
};

function CvManagement() {
  const { refetch, loading, error, data } = useQuery<CvQuery>(GET_SINGLE_CV);
  const [deleteCv] = useMutation(DELETE_CV);

  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("ID de CV invalide");
      return;
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) {
      try {
        await deleteCv({ variables: { id } });
        toast.success("CV supprimé avec succès");
        refetch();
      } catch {
        toast.error("Erreur lors de la suppression du CV");
      }
    }
  };
  return (
    <div className="flex flex-col px-4 py-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
          CV existant
        </h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <div className="max-h-100 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-25 pr-1">CV</TableHead>
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
              {data?.cv && (
                <TableRow>
                  <TableHead className="text-left">
                    {data.cv.cv.toLowerCase().endsWith(".pdf") ? (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL_FILES}${data.cv.cv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Voir le PDF
                      </a>
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL_FILES}${data.cv.cv}`}
                        alt="CV"
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    )}
                  </TableHead>
                  <TableHead>
                    <AddEditCv
                      refetch={refetch}
                      cv={data.cv}
                      triggerLabel="Modifier"
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      onClick={() => handleDelete(data.cv!.id)}
                      className="text-left w-25 pr-1"
                    >
                      Supprimer
                    </Button>
                  </TableHead>
                </TableRow>
              )}
              {!loading && !error && !data?.cv && (
                <TableRow>
                  <TableHead colSpan={3}>Aucun CV pour le moment</TableHead>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {!data?.cv && (
        <div className="mt-4">
          <AddEditCv
            refetch={refetch}
            triggerLabel="Ajouter mon CV"
          />
        </div>
      )}
    </div>
  );
}

export default CvManagement;
