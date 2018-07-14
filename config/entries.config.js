const {path, root_path, src_path, dist_path} = require("./path.config");
const Public = require("./public.options");

const entries = Object.create(null);

var mode = process.env.NODE_ENV.match(/\w+/g)[0];

switch (mode){
	case "server" :
		const fs = require("fs");
		fs.readdirSync(path.resolve(src_path, "server/")).forEach(file =>{
	  		if(file.split(".").length > 1){ //ignoring folder names
	   			entries[file.split(".")[0].replace("_", "-")] = ["babel-polyfill", "whatwg-fetch", path.resolve(src_path, `server/${file}`)];
	   		};
	   	});
	break;

	default:

		if(Public.options.entries.length > 0 && Public.options.entries[0].length > 0){
			Public.options.entries.forEach(file =>{
		   		entries[file.match(/\w+/)[0].replace("_", "-")] = ["babel-polyfill", "whatwg-fetch", path.resolve(src_path, `client/js/${file}`)];
		   	});
		}else{
			const fs = require("fs");
			fs.readdirSync(path.resolve(src_path, "client/js/")).forEach(file =>{
		  		if(file.split(".").length > 1){ //ignoring folder names
		   			entries[file.split(".")[0].replace("_", "-")] = ["babel-polyfill", "whatwg-fetch", path.resolve(src_path, `client/js/${file}`)];
		   		};
		   	});
		};
}




module.exports = entries;

