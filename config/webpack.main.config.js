const {path, root_path, src_path, dist_path, server_path} = require("./path.config");
const {Plugins, Optimization, WebpackNodeExternals} = require("./plugins.config");
const Entries = require("./entries.config");
const Public = require("./public.options");
const Rules = require("./rules.config");



var mode = process.env.NODE_ENV.match(/\w+/g)[0];

const Config = Object.create(null);
if(process.env.NODE_ENV.match(/\w+/g)[0]==="server"){
	Config.mode = "production";
}else{
	Config.mode = process.env.NODE_ENV.match(/\w+/g)[0];
}

Config.entry = Entries;

Config.target = mode==="server"?"node":"web";


Config.resolve = {
	modules:["node_modules", path.resolve('src/')]
};

Config.node = {
// Mock Node.js modules that Babel require()s but that we don't
// particularly care about.
        fs: "empty",
        net:"empty",
        helper:"empty",
        module: "empty",

};

Config.externals = [{
	jquery: 'jQuery'
}];

Config.module = {
	rules:Rules
};



Config.output = {
	filename:`${Public.options.jsFolder && Public.options.jsFolder.toString().match(/\w+/g).length?Public.options.jsFolder:"js"}/[name].js`,
	path:dist_path,
	publicPath:""
};

if(mode === "server"){
	Config.externals.push(WebpackNodeExternals());
	Config.output.path = server_path
}else{
	Config.module.noParse = /jquery/;
}


Config.plugins = Plugins;

Config.optimization = Optimization;

Config.devtool = Public.options.sourceMap?'source-map':false;

Config.devServer = {
	overlay: true,
	historyApiFallback: true,
	open:Public.options.server.open?true:false,
	port:Public.options.server.port && Public.options.server.port.toString().match(/\d+/).length?Public.options.server.port:8000,
	openPage:Public.options.entries.length?`${Public.options.entries[0]}.html`:null,
	contentBase:dist_path
};


module.exports = Config;