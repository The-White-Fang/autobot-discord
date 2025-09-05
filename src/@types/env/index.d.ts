declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "dev" | "prod";
      PORT?: string;

      DISCORD_APP_ID: string;
      DISCORD_APP_TOKEN: string;
      DISCORD_APP_PUBLIC_KEY: string;
    }
  }
}
