import { Button } from "../ui/button";
import { useRef } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type Props = {
  onSubmit: () => void;
  triggerLabel: string;
  formTitle: string;
  formDescription: string;
  isDisabled: boolean;
  children: React.ReactNode;
};

const FormSheet = ({
  onSubmit,
  triggerLabel,
  formTitle,
  formDescription,
  isDisabled,
  children,
}: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = () => {
    onSubmit();
    closeRef.current?.click();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button data-testid="openForm">{triggerLabel}</Button>
      </SheetTrigger>

      <SheetContent className="p-4 w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <SheetHeader>
          <SheetTitle>{formTitle}</SheetTitle>
          <SheetDescription>{formDescription}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter>
          <Button type="button" onClick={handleSubmit} disabled={isDisabled}>
            Enregistrer
          </Button>

          <SheetClose asChild>
            <Button
              ref={closeRef}
              variant="outline"
              className="hover:bg-popover"
            >
              Annuler
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;
