/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "accept",
            value: "(?!image|application|text).*", // Skip if the request is for static files
          },
        ],
        destination: "/user/best-matches",
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
