import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_CV, UPDATE_CV } from "../../requetes/mutations/cv.mutation";
import { useCreateOrUpdate } from "../../hooks/useCreateOrUpdate";
import { uploadFile } from "../../lib/uploadFile";
import EntityFormWrapper from "../../layoutElements/EntityFormWrapper";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";

type Cv = {
  id: string;
  cv: string;
};

type Props = {
  refetch: () => void;
  cv?: Cv;
  triggerLabel: string;
};

function AddEditCv({ refetch, cv, triggerLabel }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [createCv] = useMutation(CREATE_CV);
  const [updateCv] = useMutation(UPDATE_CV);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const { handleSubmit } = useCreateOrUpdate({
    entity: cv,
    createMutation: createCv,
    updateMutation: updateCv,
    refetch,
    buildVariables: (filename) =>
      cv
        ? {
            input: {
              id: cv.id,
              cv: filename,
            },
          }
        : {
            input: {
              cv: filename,
            },
          },
    successCreateMessage: "CV ajouté",
    successUpdateMessage: "CV mis à jour !",
  });
  const onSubmit = async () => {
    let filename = cv?.cv ?? "";

    try {
      if (file) {
        filename = await uploadFile(file);
      }
      await handleSubmit(filename);
    } catch (error) {
      console.error("Erreur lors de l'upload du CV :", error);
    }
  };

  return (
    <EntityFormWrapper
      onSubmit={onSubmit}
      triggerLabel={triggerLabel}
      title={cv ? "Modifier" : "Ajouter mon CV"}
      description={
        cv
          ? "Modifiez ce CV existant."
          : "Un CV n'existe pas encore? Ajoutez-le ici."
      }
      isDisabled={!cv && !file}
    >
      <div className="grid gap-3">
        <Label>CV</Label>
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
    </EntityFormWrapper>
  );
}

export default AddEditCv;
