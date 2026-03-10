import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

export function useSortableEntities<T extends { id: string }>({
  data,
  reorder,
}: {
  data: T[] | undefined;
  reorder: (ids: string[]) => Promise<void>;
}) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(data);
    }
  }, [data]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);

    await reorder(newItems.map((i) => i.id));
  };

  return { items, handleDragEnd };
}
