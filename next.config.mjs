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
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
  swcMinify: false, // Disable SWC minification
};

export default nextConfig;