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

if (process.env.NODE_ENV === "development") {
  nextConfig.env = {
    NEXT_PUBLIC_DEVELOPMENT_MODE: "true",
    NEXT_PUBLIC_API_URL: `http://${process.env.PUBLIC_URL}:8080`,
    NEXT_PUBLIC_API_CLIENT_URL: `http://${process.env.PUBLIC_URL}:8080`
  };
}

module.exports = nextConfig;
