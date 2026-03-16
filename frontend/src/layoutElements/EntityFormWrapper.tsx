import FormSheet from "./FormSheet";

type EntityFormWrapperProps = {
  onSubmit: () => void;
  triggerLabel: string;
  title: string;
  description: string;
  isDisabled: boolean;
  children: React.ReactNode;
};

function EntityFormWrapper({
  onSubmit,
  triggerLabel,
  title,
  description,
  isDisabled,
  children,
}: EntityFormWrapperProps) {
  return (
    <FormSheet
      onSubmit={onSubmit}
      triggerLabel={triggerLabel}
      formTitle={title}
      formDescription={description}
      isDisabled={isDisabled}
    >
      <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">{children}</div>
    </FormSheet>
  );
}

export default EntityFormWrapper;
