This packages is used as addon for SmartTVConnector. The goal is to automate SmartTV application build and deploy on SmartTV devices.

.env file example

    APPLICATION_ID = 26
    DEVICE_ID = 4
    SERVER_URL = http://192.168.50.21:8081

    OUTPUT_FOLDER = smarttv-build
    ENTRY_FOLDER = dist
    ENTRY_FILE = index.html
    ZIP_FOLDER = dist.zip

webpack compiler hook:

    const smarttv = require('smarttv-exec')
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        htmlPlugin,
        {
        apply : (compiler) =>  compiler.hooks.done.tap("done", (stats) => smarttv.doneHookCallback())
        }
    ],

webpack output:

    output: {
        path: __dirname + "/" + process.env.OUTPUT_FOLDER + "/" + process.env.ENTRY_FOLDER,
        publicPath: ${process.env.ENTRY_FOLDER}/,
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },

project structure:
    
    |___public
    |___src
    |___.env
    |___ smarttv-build
        |_dist
            |_bundle.js
        |_index.html