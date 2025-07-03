const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "host.docker.internal",
        pathname: "/visual/**",
        port: "8080",
        protocol: "http"
      }
    ]
  },
  devIndicators: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  experimental: {
    cpus: 1
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blog/resync",
        permanent: false
      }
    ];
  },
};

module.exports = nextConfig;
