This is a blog site based on [nextjs-template](https://github.com/asd55667/nextjs-template)

Blog content hoisted on github repo [blogs](https://github.com/asd55667/blogs).

## Deployed platforms

### [github pages](asd55667.github.io/wcw-blog)

### [cloudflare pages](blog.wuchengwei.com)

Build command

``` shell
git clone https://github.com/asd55667/blogs --depth 1 && npx blog-migration -i blogs -t mdx -o content && npx blog-migration -i blogs -t api -o public/api && npx tsx --tsconfig ./tsconfig.scripts.json ./src/scripts/build-registry.mts && npx tsx --tsconfig ./tsconfig.scripts.json ./src/scripts/build-static-route.mts && npx next build
```

### [vercel](https://nextjs-template-psi-six.vercel.app/)

Build command

``` shell
tsx --tsconfig ./tsconfig.scripts.json ./src/scripts/build-registry.mts && tsx --tsconfig ./tsconfig.scripts.json ./src/scripts/build-static-route.mts && npx next build
```

[Try it in stackblitz](https://stackblitz.com/github/asd55667/wcw-blog)
