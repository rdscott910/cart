/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['resizer.staging.deliverect.com'], // Add the domain for the images, nextjs does not support wildcard subdomainsŻ
  },
  crossOrigin: 'anonymous',
};

export default nextConfig;
