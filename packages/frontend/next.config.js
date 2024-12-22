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
  devIndicators: {
    appIsrStatus: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  experimental: {
    cpus: 1
  }
};

module.exports = nextConfig;
