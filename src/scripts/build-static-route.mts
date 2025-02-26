import { type Dirent, existsSync, promises as fs } from "fs";
import path from "path";



interface StaticRoute {
  slug: string[];
};

export async function buildMDXRoutes(p: string, subPath: string): Promise<StaticRoute[]> {
  const dir = path.join(p, subPath);
  const files = await fs.readdir(dir, { withFileTypes: true });

  const routes: StaticRoute[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      const subRoutes = await buildMDXRoutes(p, path.join(subPath, file.name));
      if (subRoutes.length > 0) {
        routes.push(...subRoutes.map((subRoute) => ({
          slug: [file.name, ...subRoute.slug],
        })));
      }
    } else if (file.name.endsWith(".mdx")) {
      let slug = ''

      if (file.name !== 'index.mdx') slug = file.name.replace('.mdx', '');

      routes.push({
        slug: [slug],
      });
    }
  }

  return routes;
}

type BuildCallback = typeof buildMDXRoutes

export async function resolveStaticRoutes(path: string, files: Dirent[], callback: BuildCallback) {
  return files.filter((file) => file.isDirectory()).map((file) => {

    return new Promise<[string, StaticRoute[]]>((resolve, reject) => {
      const slug = file.name;

      callback(path, slug).then((subroutes) => {

        resolve([slug, subroutes]);
      }).catch((err) => {
        reject(err);
      })
    })
  })
}

export async function buildRoutes(path: string, callback: BuildCallback): Promise<Record<string, StaticRoute[]>> {
  if (!existsSync(path)) {
    console.error("content directory not found");
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    const routes: Record<string, StaticRoute[]> = {};

    fs.readdir(path, { withFileTypes: true })
      .then((files) => {
        resolveStaticRoutes(path, files, callback).then((subroutes) => {
          Promise.all(subroutes).then((subroutes) => {
            subroutes.filter(Boolean).forEach(([slug, subroutes]) => {
              routes[slug] = subroutes;
            });
            resolve(routes);
          }).catch((err) => {
            reject(err);
          })
        })
      });

  })
}

try {
  console.log("💽 Building Static Routes...");
  const CONTENT_DIR = path.join(process.cwd(), "content");
  const REGISTRY_DIR = path.join(process.cwd(), "src/__registry__");

  await buildRoutes(CONTENT_DIR, buildMDXRoutes)
    .then((routes) => {
      console.log("✅ MDX Done!");
      const routesPath = path.join(REGISTRY_DIR, "static-routes.json");
      fs.writeFile(routesPath, JSON.stringify(routes, null, 2), "utf8");
    });
} catch (error) {
  console.error(error);
  process.exit(1);
}
