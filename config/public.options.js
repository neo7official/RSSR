const Public = new Object(null);

//This is where you will set all the options.

Public.options = {
	entries:[], //it can be multiple entries seprated with comma
	cssFolder:"", //output css folder name
	jsFolder:"",
	imageFolder:"", //output image folder name
	fontFolder:"", //output font folder name
	docFolder:"", //output doc (pdf|doc|docx|xls|xlsx|ppt|pptx) folder name
	audioFolder:"", //output audio (mp3|ogg|wav) folder name
	videoFolder:"", //output video (mp4|ogv|webm) folder name
    sourceMap:false, //controls source-map generation.
    base64Threshold:1000, //threshold value, any image (except svg image) less than 1000 bytes (default value is 1000bytes) will be compressed to base64 inline code
	favIcon:{
		folderName:"", //output favicon folder name
		inject:true, //option to inject automated chunks insertion into the html.
		title:"", //Please put project name / site name / app name here.
		background: '#fff', //background color of favicon.
	},
	htmlMinify:{
		// There are not any default value set for these options. You have to put some bulean value to it.
	   	collapseWhitespace:false, //remove extra white space.
	   	preserveLineBreaks:true, //remove line breaks.
	   	removeAttributeQuotes:false, //remove attribute quotes ("").
	   	removeComments:true,	//remove html comments.
	   	removeEmptyAttributes:false, //remove any stand alone attribute like "hidden".
	   	removeEmptyElements:false, //remove any empty html element.
    },
	splitChunks:{
		name:"commons", //name of split chunks, if ommited, it will name css/js common chunks as per file names.
	},
	customAttributes:[":attributeName",":data-attributeName", "tagName:attributeName"], //this is how you should pass any custom attributes which has image / file reference. Default setting is (["img:src", "image:href", ":data-src", "data-img", "data-image", "audio:src", "video:src", "source:src", "video:poster"])
	copyPaste:[
		{
			from:"src/js/vendor/modernizr-custom.js", //file or folder path to copy
			to:"dist/js/vendor/" //file or folder path to paste
		}
	],
	server:{
		open:true, // setting whether it will open compile page to the server or not.
		port:8000 // port no on which server will be running. Default port no. is 8000.
	}
};

module.exports = Public;