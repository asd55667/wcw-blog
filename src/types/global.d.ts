export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PLATFORM:
        | "vercel"
        | "netlify"
        | "github pages"
        | "cloudflare pages"
        | "cloudflare workers"
        | "vps";
      NEXT_PUBLIC_API_URL: string;
    }
  }
}
