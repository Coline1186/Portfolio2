import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Table, TableBody } from "@/ui/table";

type Props<T> = {
  items: T[];
  onDragEnd: (event: DragEndEvent) => void;
  renderRow: (item: T, index: number) => React.ReactNode;
};

export default function SortableAdminTable<T extends { id: string }>({
  items,
  onDragEnd,
  renderRow,
}: Props<T>) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table>
          <TableBody>{items.map((item, index) => renderRow(item, index))}</TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}