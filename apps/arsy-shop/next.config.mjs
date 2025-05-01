/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["fakestoreapi.com","picsum.photos"],
  },
};

export default nextConfig;
