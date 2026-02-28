import { useMutation, useQuery } from "@apollo/client/react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { GET_PROJECT } from "../../../requetes/queries/project.query";
import { DELETE_PROJECT } from "../../../requetes/mutations/project.mutation";
import { toast } from "sonner";
import AddEditProject from "./AddEditProject";
import { Button } from "../../../ui/button";

type ProjectQuery = {
  projects: {
    id: string;
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
  const [deleteSkill] = useMutation(DELETE_PROJECT);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await deleteSkill({ variables: { deleteProjectId: id } });
        toast.success("Projet supprimé avec succès");
        refetch();
      } catch {
        toast.error("Erreur lors de la suppression du projet");
      }
    }
  };

  return (
    <div className="flex flex-col px-4 py-3">
      <div className="mt-4 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
          Projets
        </h2>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <div className="max-h-100 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
              {data?.projects.map((project) => (
                <TableRow key={project.id}>
                  <TableHead className="text-left">{project.name}</TableHead>
                  <TableHead className="text-left">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL_FILES}${project.image}`}
                      alt={`Logo de ${project.name}`}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </TableHead>
                  <TableHead className="text-left">
                    {project.githubLink}
                  </TableHead>
                  <TableHead className="text-left">{project.webLink}</TableHead>
                  {project.skills.map((skill) => (
                    <span key={skill.id} className="mr-2">
                      {skill.logo && (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL_FILES}${skill.logo}`}
                          alt={`Logo de ${skill.logo}`}
                          className="w-6 h-6 object-cover rounded-md"
                        />
                      )}
                    </span>
                  ))}
                  <TableHead>
                    <AddEditProject
                      refetch={refetch}
                      project={project}
                      triggerLabel="Modifier"
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      onClick={() => handleDelete(project.id)}
                      className="text-left w-25 pr-1"
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
        <AddEditProject
          refetch={refetch}
          triggerLabel="Créer un nouveau projet"
        />
      </div>
    </div>
  );
}

export default ProjectManagement;
