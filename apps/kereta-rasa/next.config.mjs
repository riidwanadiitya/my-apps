/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["fakestoreapi.com", "picsum.photos"],
  },
};

export default nextConfig;
