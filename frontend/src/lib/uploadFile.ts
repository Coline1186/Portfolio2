import instance from "../lib/instance";

export async function uploadFile(file: File): Promise<string> {
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
