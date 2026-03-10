import { useMutation, useQuery } from "@apollo/client/react";
import { TableHead, TableHeader, TableRow } from "../../ui/table";
import { GET_PROJECT } from "../../requetes/queries/project.query";
import {
  DELETE_PROJECT,
  REORDER_PROJECTS,
} from "../../requetes/mutations/project.mutation";
import { toast } from "sonner";
import AddEditProject from "./AddEditProject";
import { useSortableEntities } from "@/hooks/useSortableEntities";
import SortableAdminTable from "@/layoutElements/SortableAdminTable";
import SortableProjectRow from "./SortableProjectRow";

type ProjectQuery = {
  projects: {
    id: string;
    position: number;
    name: string;
    image: string;
    webLink: string;
    githubLink: string;
    skills: {
      id: string;
      name: string;
      logo: string;
    }[];
  }[];
};

function ProjectManagement() {
  const { refetch, loading, error, data } = useQuery<ProjectQuery>(GET_PROJECT);
  const [reorderProjects] = useMutation(REORDER_PROJECTS);
  const { items: projects, handleDragEnd } = useSortableEntities({
    data: data?.projects,
    reorder: async (ids) => {
      await reorderProjects({ variables: { ids } });
    },
  });
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await deleteProject({ variables: { deleteProjectId: id } });
        toast.success("Projet supprimé avec succès");
        refetch();
      } catch {
        toast.error("Erreur lors de la suppression du projet");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;

  return (
    <div className="flex flex-col px-4 py-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
          Projets
        </h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <SortableAdminTable
          items={projects}
          onDragEnd={handleDragEnd}
          header={
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-62.5 pr-1">
                  Réorganiser
                </TableHead>
                <TableHead className="text-left w-62.5 pr-1">
                  Position
                </TableHead>
                <TableHead className="text-left w-62.5 pr-1">Nom</TableHead>
                <TableHead className="text-left w-25 pr-1">Image</TableHead>
                <TableHead className="text-left w-25 pr-1">
                  Lien GitHub
                </TableHead>
                <TableHead className="text-left w-25 pr-1">
                  Lien du site
                </TableHead>
                <TableHead className="text-left w-25 pr-1">Stack</TableHead>
                <TableHead className="text-left w-25 pr-1">Modifier</TableHead>
                <TableHead className="text-left w-25 pr-1">Supprimer</TableHead>
              </TableRow>
            </TableHeader>
          }
          renderRow={(project, index) => (
            <SortableProjectRow
              key={project.id}
              project={project}
              index={index}
              refetch={refetch}
              handleDelete={handleDelete}
            />
          )}
        />
      </div>

      <div className="mt-4">
        <AddEditProject
          refetch={refetch}
          triggerLabel="Créer un nouveau projet"
        />
      </div>
    </div>
  );
}

export default ProjectManagement;
