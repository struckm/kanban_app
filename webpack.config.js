const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

const common = {
    entry: {
        app: PATHS.app
    },
    // Add resolve.extensions.
    // '' is needed to allow imports without an extension.
    // Not the .'s before extensions as it will fail to match without!!!
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        // jshint is throwing errors with jsx, commenting out for now
        // preLoaders: [
        //     {
        //         test: /\.js?$/,
        //         loaders: ['jshint'],
        //         // define an include so we check just the files we need
        //         include: PATHS.app
        //     }  
        // ],
        loaders: [
            {
                // Test expects a RegExp! Not the slashes!
                test: /\.css$/,
                loaders: ['style', 'css'],
                // Include accepts either a path or an array of paths
                include: PATHS.app
            },
            // Set up jsx. This accepts js too thanks to RegExp
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. i.e.,  babel?cacheDirectory=<path>
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            }
        ]
    }
    
}

// Default configuration
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        devServer: {
            contentBase: PATHS.build,
            
            // Enable history API fallback so HTML5 History API based
            // routing works. THis is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            
            // Display only errors to reduce the amount of output
            stats: 'errors-only',
            
            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()            
        ]
    });    
}

if(TARGET === 'build') {
    module.exports = merge(common, {});
}