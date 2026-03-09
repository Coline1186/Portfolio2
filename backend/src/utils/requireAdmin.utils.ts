type Context = {
  user?: {
    role: string;
  };
};

function requireAdmin<TArgs = unknown, TResult = unknown>(
  resolver: (
    parent: unknown,
    args: TArgs,
    context: Context,
    info: unknown,
  ) => Promise<TResult> | TResult,
) {
  return async (parent: unknown, args: TArgs, context: Context, info: unknown) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }

    if (context.user.role !== "ADMIN") {
      throw new Error("Not authorized");
    }

    return resolver(parent, args, context, info);
  };
}

export default requireAdmin;
