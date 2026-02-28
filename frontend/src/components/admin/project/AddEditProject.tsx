import { useMutation, useQuery } from "@apollo/client/react";
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
} from "../../../requetes/mutations/project.mutation";
import { useState } from "react";
import { uploadFile } from "../../../lib/uploadFile";
import { useCreateOrUpdate } from "../../../hooks/useCreateOrUpdate";
import EntityFormWrapper from "../../../layoutElements/EntityFormWrapper";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../ui/input";
import { GET_SKILLS } from "../../../requetes/queries/skill.query";

type Skill = {
  id: string;
  name: string;
  logo: string;
};

type SkillQuery = {
  skills: {
    id: string;
    logo: string;
    name: string;
  }[];
};

type Project = {
  id: string;
  name: string;
  image: string;
  githubLink: string;
  webLink: string;
  skills: Skill[];
};

type Props = {
  refetch: () => void;
  project?: Project;
  triggerLabel: string;
};

function AddEditProject({ refetch, project, triggerLabel }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState(project?.name ?? "");
  const [githubLink, setGithubLink] = useState(project?.githubLink ?? "");
  const [webLink, setWebLink] = useState(project?.webLink ?? "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    project?.skills.map((s) => s.id) ?? [],
  );
  const { data: skillsData } = useQuery<SkillQuery>(GET_SKILLS);
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleGithubLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubLink(e.target.value);
  };
  const handleWebLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebLink(e.target.value);
  };
  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedSkills(selected);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const { handleSubmit } = useCreateOrUpdate({
    entity: project,
    createMutation: createProject,
    updateMutation: updateProject,
    refetch,
    buildVariables: (filename) =>
      project
        ? {
            input: {
              id: project.id,
              name,
              githubLink,
              webLink,
              image: filename,
              skillIds: selectedSkills,
            },
          }
        : {
            input: {
              name: name,
              githubLink,
              webLink,
              image: filename,
              skillIds: selectedSkills,
            },
          },
    successCreateMessage: "Projet ajouté",
    successUpdateMessage: "Projet mis à jour !",
  });
  const onSubmit = async () => {
    let filename = project?.image ?? "";

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
      title={project ? "Modifier" : "Créer un nouveau projet"}
      description={
        project
          ? "Modifiez ce projet existant."
          : "Un projet n'existe pas encore? Créez-le ici."
      }
      isDisabled={!project && !name.trim()}
    >
      <div className="grid gap-3">
        <Label>Nom</Label>
        <Input value={name} onChange={handleNameChange} />
      </div>
      <div className="grid gap-3">
        <Label>Image</Label>
        <Input type="file" onChange={handleFileChange} />
      </div>
      <div className="grid gap-3">
        <Label>GitHub Link</Label>
        <Input value={githubLink} onChange={handleGithubLinkChange} />
      </div>
      <div className="grid gap-3">
        <Label>Web Link</Label>
        <Input value={webLink} onChange={handleWebLinkChange} />
      </div>
      <div className="grid gap-3">
        <Label>Compétences associées</Label>
        <select
          multiple
          value={selectedSkills}
          onChange={handleSkillsChange}
          className="border rounded p-2"
        >
          {skillsData?.skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
    </EntityFormWrapper>
  );
}

export default AddEditProject;
