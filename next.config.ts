/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com'], // <-- adicione aqui o domínio
  },
};

module.exports = nextConfig;
