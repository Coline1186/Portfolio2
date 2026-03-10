import { useMutation, useQuery } from "@apollo/client/react";
import { GET_SKILLS } from "../../requetes/queries/skill.query";
import {
  DELETE_SKILL,
  REORDER_SKILLS,
} from "../../requetes/mutations/skill.mutation";

import { toast } from "sonner";
import AddEditSkill from "./AddEditSkill";
import { useSortableEntities } from "@/hooks/useSortableEntities";
import SortableAdminTable from "@/layoutElements/SortableAdminTable";
import SortableSkillRow from "./SortableSkillRow";
import { TableHead, TableHeader, TableRow } from "@/ui/table";

type Skill = {
  id: string;
  position: number;
  name: string;
  logo: string;
};

type SkillQuery = {
  skills: Skill[];
};

function SkillManagement() {
  const { data, loading, error, refetch } = useQuery<SkillQuery>(GET_SKILLS);
  const { items: skills, handleDragEnd } = useSortableEntities({
    data: data?.skills,
    reorder: async (ids) => {
      await reorderSkills({ variables: { ids } });
    },
  });
  const [deleteSkill] = useMutation(DELETE_SKILL);
  const [reorderSkills] = useMutation(REORDER_SKILLS);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
      try {
        await deleteSkill({ variables: { deleteSkillId: id } });
        toast.success("Compétence supprimée");
        refetch();
      } catch {
        toast.error("Erreur suppression");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;

  return (
    <div className="flex flex-col px-4 py-3">
      <h2 className="text-xl font-bold border-b-2 border-primary inline-block pb-1 mb-6">
        Compétences existantes
      </h2>

      <div className="border rounded-md overflow-x-auto">
        <SortableAdminTable
          items={skills}
          onDragEnd={handleDragEnd}
          header={
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-62.5 pr-1">Réorganiser</TableHead>
                <TableHead className="text-left w-62.5 pr-1">Position</TableHead>
                <TableHead className="text-left w-62.5 pr-1">Nom</TableHead>
                <TableHead className="text-left w-25 pr-1">Logo</TableHead>
                <TableHead className="text-left w-25 pr-1">Modifier</TableHead>
                <TableHead className="text-left w-25 pr-1">Supprimer</TableHead>
              </TableRow>
            </TableHeader>
          }
          renderRow={(skill, index) => (
            <SortableSkillRow
              key={skill.id}
              skill={skill}
              index={index}
              refetch={refetch}
              handleDelete={handleDelete}
            />
          )}
        />
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
