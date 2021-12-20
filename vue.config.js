module.exports = {
    publicPath: '',
    assetsDir: 'assets',
    configureWebpack: {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        enforce: true,
                    }
                }
            }
        },
    }
}