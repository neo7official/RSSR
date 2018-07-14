const {path, root_path, src_path, dist_path, server_path} = require("./path.config");
const Entries = require("./entries.config");
const Public = require("./public.options");

const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNodeExternals = require("webpack-node-externals");



var mode = process.env.NODE_ENV.match(/\w+/g)[0];

const Plugins = [];
const Optimization=Object.create(null);


if(mode!=="server"){
	Object.keys(Entries).forEach(ent =>{
		Plugins.push(
				new HtmlWebpackPlugin({
					template: path.resolve(src_path, `client/${ent}.html`),
					filename:path.resolve(dist_path, `${ent}.html`),
					inject:true,
				    chunks:[ent]
				})
		)
	});
}
	

Plugins.push(
	new ProgressBarPlugin(),

	//new webpack.IgnorePlugin(/\.png$/),
		

	function(){
		if(mode === "production"){
			const MiniCssExtractPlugin = require("mini-css-extract-plugin");
			return new MiniCssExtractPlugin({
							filename:`${Public.options.cssFolder.match(/\w+/g)?Public.options.cssFolder:'css'}/[name].css`
						});
		}else{
			return ()=>{};
		}
	}(),

	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery",
		_:"lodash",
	}),
	function(){
		if(mode === "production"){
			const ImageminPlugin = require("imagemin-webpack-plugin").default;
			return new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i });
		}else{
			return ()=>{};
		}
	}(),
	function(){
		if(mode === "production"){
			const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
			return new FaviconsWebpackPlugin({
				// Your source logo
			    logo: path.resolve(src_path, 'client/favicon.png'),
			    // The prefix for all image files (might be a folder or a name)
			    prefix: Public.options.favIcon.folderName.match(/\w+/g)?`${Public.options.favIcon.folderName}/`:'favicons/',
			    // Emit all stats of the generated icons
			    emitStats: false,
			    // The name of the json containing all favicon information
			    statsFilename: 'iconstats.json',
			    // Generate a cache file with control hashes and
			    // don't rebuild the favicons until those hashes change
			    persistentCache: true,
			    // Inject the html into the html-webpack-plugin
			    inject: Public.options.favIcon.inject,
			    // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
			    background: Public.options.favIcon.background,
			    // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
			    title: Public.options.favIcon.title,

			    // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			    icons: {
			      android: true,
			      appleIcon: true,
			      appleStartup: true,
			      coast: false,
			      favicons: true,
			      firefox: true,
			      opengraph: false,
			      twitter: false,
			      yandex: false,
			      windows: false
			    }
			});
		}else{
			return ()=>{};
		}
	}(),
	function(){
		if(mode === "production"|| mode === "server"){
			const CleanWebpackPlugin = require('clean-webpack-plugin');
			return new CleanWebpackPlugin(
						[mode === "server"?server_path:dist_path],
						{
							root:root_path,
							allowExternal: false,
							beforeEmit: false
						}
					);
		}else{
			return ()=>{};
		}
	}(),
	function(){
		if(mode === "production"){
			return CopyWebpackPlugin(Public.options.copyPaste)
		}else{
			return ()=>{};
		}
	},
	
	function(){
		/*if(Public.options.sourceMap){
			const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
			return new BundleAnalyzerPlugin({analyzerPort: 1025});
		}else{
			return ()=>{};
		}*/
	}
);
	
Optimization.splitChunks={
	name:Public.options.splitChunks.name.match(/\w+/g)?Public.options.splitChunks.name:true,
	chunks:"all",
};
    
Optimization.minimizer= [
	function(){
		if(mode === "production"){

			const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

			return new UglifyJsPlugin({
					    cache: true,
					    parallel: true,
					    sourceMap: Public.options.sourceMap?true:false // set to true if you want JS source maps
					  })
		}else{
			return ()=>{};
		}
	}(),
  new OptimizeCSSAssetsPlugin({
  	cssProcessor: require('cssnano'),
  	cssProcessorOptions: { discardComments: { removeAll: true }, zindex:false },
  	canPrint: true
  })
];

module.exports = {Plugins, Optimization, WebpackNodeExternals};