import jwt from "jsonwebtoken";

export const generateToken = (id: number) => {
  const accessToken: string = jwt.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken: string = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return { accessToken, refreshToken };
};
