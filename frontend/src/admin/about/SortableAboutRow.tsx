import { TableHead, TableRow } from "@/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddEditAbout from "./AddEditAbout";
import { Button } from "@/ui/button";

type About = {
  id: string;
  position: number;
  image: string;
};

type Props = {
  about: About;
  index: number;
  refetch: () => void;
  handleDelete: (id: string) => void;
};

export default function SortableAboutRow({
  about,
  index,
  refetch,
  handleDelete,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: about.id });

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
      <TableHead>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_FILES}${about.image}`}
          className="w-10 h-10 object-cover rounded-md"
        />
      </TableHead>

      <TableHead>
        <AddEditAbout refetch={refetch} about={about} triggerLabel="Modifier" />
      </TableHead>

      <TableHead>
        <Button onClick={() => handleDelete(about.id)} className="w-25">
          Supprimer
        </Button>
      </TableHead>
    </TableRow>
  );
}
