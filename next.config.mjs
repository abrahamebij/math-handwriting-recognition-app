/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [{ source: "/", destination: "/home" }];
  },
  images: {
    remotePatterns: [],
  },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
