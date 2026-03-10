import AddEditSkill from "@/admin/skill/AddEditSkill";
import { Button } from "@/ui/button";
import { TableHead, TableRow } from "@/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Skill = {
  id: string;
  position: number;
  name: string;
  logo: string;
};

type Props = {
  skill: Skill;
  index: number;
  refetch: () => void;
  handleDelete: (id: string) => void;
};

export default function SortableSkillRow({
  skill,
  index,
  refetch,
  handleDelete,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: skill.id });

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
      <TableHead>{skill.name}</TableHead>

      <TableHead>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_FILES}${skill.logo}`}
          className="w-10 h-10 object-cover rounded-md"
        />
      </TableHead>

      <TableHead>
        <AddEditSkill refetch={refetch} skill={skill} triggerLabel="Modifier" />
      </TableHead>

      <TableHead>
        <Button onClick={() => handleDelete(skill.id)} className="w-25">
          Supprimer
        </Button>
      </TableHead>
    </TableRow>
  );
}
