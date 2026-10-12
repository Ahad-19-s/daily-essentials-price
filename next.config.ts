/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google profile image domain
      "avatars.githubusercontent.com", // GitHub profile image domain
      "platform-lookaside.fbsbx.com", // Facebook profile image domain
      "pbs.twimg.com", // Twitter profile image domain
    ],
  },
};

module.exports = nextConfig;
