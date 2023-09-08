const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withAntdLess = require('next-plugin-antd-less')({
  modifyVars: { '@primary-color': '#CD7DA0' },
});

module.exports = withPlugins([withBundleAnalyzer, withAntdLess, withImages], {
  compress: true,
  future: {
    webpack5: true,
  },
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: process.env.NODE_ENV,
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
});
