/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/api/:path*"
            : "/api/",
      },
    ];
  },
  webpack: function (config, context) {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
