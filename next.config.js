/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone',
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    }

   // Set Webpack output environment configuration for async/await support
    config.output.environment = {
      ...config.output.environment,
      asyncFunction: true,
    };

    return config
  }
}

module.exports = nextConfig
