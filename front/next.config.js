const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3065',
        pathname: '/**',
      },
    ],
  },
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    );
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
