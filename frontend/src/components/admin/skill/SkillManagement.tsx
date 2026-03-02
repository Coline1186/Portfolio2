import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Button } from "../../../ui/button";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_SKILLS } from "../../../requetes/queries/skill.query";
import { DELETE_SKILL } from "../../../requetes/mutations/skill.mutation";
import { toast } from "sonner";
import AddEditSkill from "./AddEditSkill";

type SkillQuery = {
  skills: {
    id: string;
    logo: string;
    name: string;
  }[];
};

function SkillManagement() {
  const { refetch, loading, error, data } = useQuery<SkillQuery>(GET_SKILLS);
  const [deleteSkill] = useMutation(DELETE_SKILL);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
      try {
        await deleteSkill({ variables: { deleteSkillId: id } });
        toast.success("Compétence supprimée avec succès");
        refetch();
      } catch {
        toast.error("Erreur lors de la suppression de la compétence");
      }
    }
  };

  return (
    <div className="flex flex-col px-4 py-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
          Compétences existantes
        </h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <div className="max-h-100 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-62.5 pr-1">Nom</TableHead>
                <TableHead className="text-left w-25 pr-1">Logo</TableHead>
                <TableHead className="text-left w-25 pr-1">Modifier</TableHead>
                <TableHead className="text-left w-25 pr-1">Supprimer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableHead colSpan={4}>Chargement...</TableHead>
                </TableRow>
              )}

              {error && (
                <TableRow>
                  <TableHead colSpan={4}>Erreur de chargement</TableHead>
                </TableRow>
              )}
              {data?.skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableHead className="text-left">{skill.name}</TableHead>
                  <TableHead className="text-left">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL_FILES}${skill.logo}`}
                      alt={`Logo de ${skill.name}`}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </TableHead>
                  <TableHead>
                    <AddEditSkill
                      refetch={refetch}
                      skill={skill}
                      triggerLabel="Modifier"
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      onClick={() => handleDelete(skill.id)}
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
        <AddEditSkill
          refetch={refetch}
          triggerLabel="Créer une nouvelle compétence"
        />
      </div>
    </div>
  );
}

export default SkillManagement;
