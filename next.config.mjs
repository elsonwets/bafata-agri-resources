/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // The image pipeline in scripts/optimize-images.mjs pre-generates the
  // AVIF and WebP responsive sets, so the runtime optimiser has nothing
  // left to do and would not run under a static export anyway.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
