import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import {
  CREATE_ABOUT,
  UPDATE_ABOUT,
} from "../../requetes/mutations/about.mutation";
import { useCreateOrUpdate } from "../../hooks/useCreateOrUpdate";
import { uploadFile } from "../../lib/uploadFile";
import EntityFormWrapper from "../../layoutElements/EntityFormWrapper";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";

type About = {
  id: string;
  image: string;
};

type Props = {
  refetch: () => void;
  about?: About;
  triggerLabel: string;
};

function AddEditAbout({ refetch, about, triggerLabel }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [createAbout] = useMutation(CREATE_ABOUT);
  const [updateAbout] = useMutation(UPDATE_ABOUT);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const { handleSubmit } = useCreateOrUpdate({
    entity: about,
    createMutation: createAbout,
    updateMutation: updateAbout,
    refetch,
    buildVariables: (filename) =>
      about
        ? {
            input: {
              id: about.id,
              image: filename,
            },
          }
        : {
            input: {
              image: filename,
            },
          },
    successCreateMessage: "Photo ajoutée",
    successUpdateMessage: "Photo mise à jour !",
  });
  const onSubmit = async () => {
    let filename = about?.image ?? "";

    try {
      if (file) {
        filename = await uploadFile(file);
      }

      await handleSubmit(filename);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EntityFormWrapper
      onSubmit={onSubmit}
      triggerLabel={triggerLabel}
      title={about ? "Modifier" : "Ajouter une nouvelle photo"}
      description={
        about
          ? "Modifiez cette photo existante."
          : "Une photo n'existe pas encore? Ajoutez la ici."
      }
      isDisabled={!about && !file}
    >
      <div className="grid gap-3">
        <Label>Photo</Label>
        <Input type="file" onChange={handleFileChange} />
      </div>
    </EntityFormWrapper>
  );
}

export default AddEditAbout;
