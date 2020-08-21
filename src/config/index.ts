import { config } from "dotenv";
config();

export const Config = {
    PORT: Number(process.env.PORT) || Number(process.argv[2]) || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "test",
    isProd: process.env.NODE_ENV === "production",
    API_URL: process.env.API_URL || "https://zink.alifurkan.codes/v1",
    SYSTEM_TOKEN: process.env.TOKEN,
};
