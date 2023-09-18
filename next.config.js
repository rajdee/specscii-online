/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.BASE_PATH,
    assetPrefix: process.env.ASSET_PREFIX,
}

module.exports = nextConfig
