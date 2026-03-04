export async function generateToken(email: string): Promise<string> {
   const { SignJWT } = await import("jose")
   return await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}