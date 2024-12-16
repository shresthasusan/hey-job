/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user/best-matches",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
