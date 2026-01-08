/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [],
    },
    eslint: { ignoreDuringBuilds: true },
}

module.exports = nextConfig
