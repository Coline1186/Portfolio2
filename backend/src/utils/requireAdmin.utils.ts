function requireAdmin(resolver: any) {
  return async (parent: any, args: any, context: any, info: any) => {
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