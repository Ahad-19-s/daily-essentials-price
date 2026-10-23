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
   
     
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // Google profile image
      },
       {
      protocol: "https",
      hostname: "**",
    },
      
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**", // GitHub avatars
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/**", // Facebook profile images
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/profile_images/**", // Twitter profile images
      },
      {
        protocol: "https",
        hostname: "tse2.mm.bing.net",
        pathname: "/**", // Bing thumbnails
      },
    ],
  },
};

module.exports = nextConfig;
