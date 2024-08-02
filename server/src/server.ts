import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app";
import prisma from "./database/database";

const port = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
