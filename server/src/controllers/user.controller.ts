import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import prisma from "../database/database";
import { User } from "@prisma/client";
import { generateToken } from "../utils/token";
import { CatchAsync } from "../utils/CatchAsync";
import bcrypt from "bcryptjs";
import { Role } from "../types/roles";
import jwt from "jsonwebtoken";
import { parse } from "path";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface RegisterRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    roles: Role;
  };
}

interface getMeRequest extends Request {
  user: User;
}

const generateAccessAndRefreshTokens = async (
  userId: number,
  next: NextFunction
): Promise<{ accessToken: string; refreshToken: string } | void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const { accessToken, refreshToken } = generateToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    next(
      new AppError(
        "Something went wrong while generating refresh and access tokens",
        500
      )
    );
  }
};

export const login = CatchAsync(
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please fill the form completely!", 400));
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return next(new AppError("User does not exist!", 404));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return next(new AppError("Invalid credentials!", 400));
    }

    const tokens = await generateAccessAndRefreshTokens(existingUser.id, next);

    const { accessToken, refreshToken } = tokens as {
      accessToken: string;
      refreshToken: string;
    };

    const options = {
      httpOnly: true,
      secure: true,
      overwrite: true,
      sameSite: "none" as const,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: "success",
        message: "User logged in successfully",
        data: {
          user: existingUser,
          accessToken,
          refreshToken,
        },
      });
  }
);

export const register = CatchAsync(
  async (req: RegisterRequest, res: Response, next: NextFunction) => {
    const { email, password, username, roles } = req.body;

    if (!email || !password || !username) {
      return next(new AppError("Please fill the form completely!", 400));
    }

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return next(new AppError("User already exists!", 400));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roles,
      },
    });

    if (!newUser) {
      return next(new AppError("User could not be created!", 500));
    }

    const tokens = await generateAccessAndRefreshTokens(newUser.id, next);

    const { accessToken, refreshToken } = tokens as {
      accessToken: string;
      refreshToken: string;
    };

    const options = {
      httpOnly: true,
      secure: true,
      overwrite: true,
      sameSite: "none" as const,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: "success",
        message: "User registered successfully",
        data: {
          user: newUser,
          accessToken,
          refreshToken,
        },
      });
  }
);

export const getMe = CatchAsync(async (req: getMeRequest, res: Response) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    message: "User details fetched successfully",
    data: {
      user,
    },
  });
});

export const getUserById = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);

    console.log(userId);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "User details fetched successfully",
      data: {
        user,
      },
    });
  }
);

export const logout = CatchAsync(async (req: Request, res: Response) => {
  res.status(200).clearCookie("refreshToken").clearCookie("accessToken").json({
    status: "success",
    message: "User logged out successfully",
  });
});
