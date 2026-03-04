import { validate } from "class-validator";

export async function validateEntity(entity: object): Promise<void> {
  const errors = await validate(entity);

  if (errors.length > 0) {
    const messages = errors
      .map(error =>
        Object.values(error.constraints ?? {}).join(", ")
      )
      .join(" | ");

    throw new Error(messages);
  }
}
