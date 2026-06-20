/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent server-only Node.js modules from being bundled in the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        fs: false,
        child_process: false,
        snappy: false,
        kerberos: false,
        'mongodb-client-encryption': false,
        '@aws-sdk/credential-providers': false,
        'gcp-metadata': false,
        socks: false,
        '@mongodb-js/zstd': false,
      }
    }
    return config
  },
}

module.exports = nextConfig
