import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useState } from "react";
import {
  CREATE_SKILL,
  UPDATE_SKILL,
} from "../../requetes/mutations/skill.mutation";
import { useMutation } from "@apollo/client/react";
import { useCreateOrUpdate } from "../../hooks/useCreateOrUpdate";
import { uploadFile } from "../../lib/uploadFile";
import EntityFormWrapper from "../../layoutElements/EntityFormWrapper";

type Skill = {
  id: string;
  name: string;
  logo: string;
};

type Props = {
  refetch: () => void;
  skill?: Skill;
  triggerLabel: string;
};

const AddEditSkill = ({ refetch, skill, triggerLabel }: Props) => {
  const [name, setName] = useState(skill?.name ?? "");
  const [file, setFile] = useState<File | null>(null);

  const [createSkill] = useMutation(CREATE_SKILL);
  const [updateSkill] = useMutation(UPDATE_SKILL);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const { handleSubmit } = useCreateOrUpdate({
    entity: skill,
    createMutation: createSkill,
    updateMutation: updateSkill,
    refetch,
    buildVariables: (filename) =>
      skill
        ? {
            input: {
              id: skill.id,
              name,
              logo: filename,
            },
          }
        : {
            input: {
              name,
              logo: filename,
            },
          },
    successCreateMessage: "Compétence créée !",
    successUpdateMessage: "Compétence mise à jour !",
  });
  const onSubmit = async () => {
    if (!name.trim()) return;

    let filename = skill?.logo ?? "";

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
      title={skill ? "Modifier" : "Créer une nouvelle compétence"}
      description={
        skill
          ? "Modifiez cette compétence existante."
          : "Une compétence n'existe pas encore? Créez la ici."
      }
      isDisabled={!name.trim() || (!skill && !file)}
    >
      <div className="grid gap-3">
        <Label>Nom</Label>
        <Input value={name} onChange={handleNameChange} />
      </div>

      <div className="grid gap-3">
        <Label>Logo</Label>
        <Input type="file" onChange={handleFileChange} />
      </div>
    </EntityFormWrapper>
  );
};

export default AddEditSkill;
