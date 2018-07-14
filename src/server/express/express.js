import express from "express";
import React from "react";
import reactDOMServer from "react-dom/server";

import { HomeComp } from "../../client/js/components/homecomp";



const server = express();

const staticMiddleWare = express.static("dist", {

});

server.use(staticMiddleWare);


server.get("*", (req, res)=>{

	const html  = reactDOMServer.renderToString(<HomeComp/>);

	console.log(html);

	res.send(
		`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Skills Matrix - Competency Framework</title>
  <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet"> 
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<body> 

  <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
  <div id="application" class="main">${html}</div>  

  
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="client/js/commons.js"></script><script src="client/js/index.js"></script></body>
</html>`
	);
});

server.listen(8500, ()=>{
	console.log("Server is running on 8500 port.")
})