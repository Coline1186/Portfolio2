import { TableHead, TableRow } from "@/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/ui/button";
import AddEditProject from "./AddEditProject";

type Skill = {
  id: string;
  name: string;
  logo: string;
};

type Project = {
  id: string;
  position: number;
  name: string;
  image: string;
  githubLink: string;
  webLink: string;
  skills: Skill[];
};
type Props = {
  project: Project;
  index: number;
  refetch: () => void;
  handleDelete: (id: string) => void;
};

export default function SortableProjectRow({
  project,
  index,
  refetch,
  handleDelete,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableHead
        className="cursor-grab w-10"
        {...attributes}
        {...listeners}
        aria-label="Réorganiser"
        aria-roledescription="draggable"
      >
        ⋮⋮
      </TableHead>

      <TableHead>{index + 1}</TableHead>
      <TableHead>{project.name}</TableHead>
      <TableHead>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_FILES}${project.image}`}
          className="w-10 h-10 object-cover rounded-md"
        />
      </TableHead>
      <TableHead className="max-w-10 lg:max-w-70 truncate">
        {project.githubLink}
      </TableHead>
      <TableHead className="max-w-10 lg:max-w-60 truncate">
        {project.webLink}
      </TableHead>
      <TableHead>
        <div className="flex flex-wrap gap-2 min-h-6 items-center">
          {project.skills.length > 0 ? (
            project.skills.map((skill) => (
              <div
                key={skill.id}
                className="w-6 h-6 flex items-center justify-center"
              >
                {skill.logo ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL_FILES}${skill.logo}`}
                    alt={`Logo de ${skill.name}`}
                    className="w-6 h-6 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-200 rounded-md" />
                )}
              </div>
            ))
          ) : (
            <span className="text-xs text-gray-400"></span>
          )}
        </div>
      </TableHead>
      <TableHead>
        <AddEditProject
          refetch={refetch}
          project={project}
          triggerLabel="Modifier"
        />
      </TableHead>

      <TableHead>
        <Button onClick={() => handleDelete(project.id)} className="w-25">
          Supprimer
        </Button>
      </TableHead>
    </TableRow>
  );
}
