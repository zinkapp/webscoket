import { config } from "dotenv";
config();

export const Config = {
  PORT: Number(process.env.PORT) || Number(process.argv[2]) || 80,
  SECRET_KEY: process.env.SECRET_KEY || "test",
  isProd: process.env.NODE_ENV === "production",
  API_URL: process.env.API_URL || "https://zink.alifurkan.codes/v1",
};
