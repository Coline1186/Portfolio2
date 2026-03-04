import instance, { uploadBaseUrl } from "../lib/instance";

export async function uploadFile(file: File): Promise<string> {
  if (!uploadBaseUrl) {
    throw new Error(
      "Configuration manquante: VITE_BACKEND_URL_FILES",
    );
  }

  const formData = new FormData();
  formData.append("file", file, file.name);

  const {
    data: { filename, status },
  } = await instance.post<{ filename: string; status: string }>(
    "/upload",
    formData
  );

  if (status !== "success") {
    throw new Error("Erreur upload");
  }

  return filename;
}
