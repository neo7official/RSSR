const path = require("path");

let getPath = () => {
	const root_path = path.resolve("./");
	const src_path = path.resolve('src/');
	const common_dist_path = path.resolve('dist/');
	const dist_path = path.resolve(common_dist_path, 'client/');
	const server_path = path.resolve(common_dist_path, 'server/');
	const Paths = {path, root_path, src_path, dist_path, server_path};
	return Paths;
};
module.exports = getPath();