declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN?: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD?: string;
      JWT_SECRET?: string;
      DB_CONN_STRING?: string;
    }
  }
}

export default global;
