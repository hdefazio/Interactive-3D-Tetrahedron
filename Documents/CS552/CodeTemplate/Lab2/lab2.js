//Hannah DeFazio

//Code for Lab2
var gl;
var myShaderProgram;
var bufferId;
var n;
var tx;
var xval;
var yval;
var ty;
var translationUniform;
var coordinatesUniform;
var stopStartFlag;
var thetaVal;
var thetaUniform;

function init(){

	var canvas = document.getElementById("gl-canvas");
	
	gl = WebGLUtils.setupWebGL(canvas);
	gl.viewport(0, 0, 512, 512);
	gl.clearColor(1.0, 1.0, 0.0, 1.0);
	

	myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

	stopStartFlag = 1;

	thetaVal = 0.0;
	thetaUniform = gl.getUniformLocation(myShaderProgram, "theta");
	gl.uniform1f(thetaUniform, thetaVal);
	
	tx = 0.0;
	xval = 0.01;
	ty = 0.0;
	yval = 0.0;
	translationUniform = gl.getUniformLocation(myShaderProgram, "translation");
	gl.uniform4f(translationUniform, xval, yval, 0.0, 0.0);
	
	coordinatesUniform = gl.getUniformLocation(myShaderProgram, "coordinates");
	gl.uniform2f(coordinatesUniform, tx, ty);

	drawPoly();
	render();
}



function drawPoly(){

	var arrPoly = [];
	var colors = [];
    	var x = 0;
	var y = 0;
   	n = 5;
    	var theta = 0;
    	var i = 0;
    	var a = 0.0;
	var b = 0.0;
    	var c = 0.2;
    	var d = 0.2;

    	for( i=0; i<n; ++i){
    	theta = i *2.0 * Math.PI / n;
    	x = c * Math.cos( theta) + a;
    	y = d * Math.sin(theta) + b;
    	var p = vec2(x, y);
    	arrPoly.push(p);

    	}

    	bufferId = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);
    	gl.bufferData( gl.ARRAY_BUFFER, flatten(arrPoly), gl.STATIC_DRAW);

    	var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition");
    	gl.vertexAttribPointer( myPosition, 2, gl.FLOAT, false, 0, 0);
    	gl.enableVertexAttribArray(myPosition);
    
	
	
}


function movePolyKeys(event){

	console.log("here1k");
	var theKeyCode = event.keyCode;
    	if ( theKeyCode == 65 ) { // a
        	xval = -0.01;
		yval = 0.0;
    	} else if ( theKeyCode == 68 ) { // d
        	xval = 0.01;
		yval = 0.0;
    	}  else if ( theKeyCode == 83 ) { // s
        	xval = 0.0;
		yval = -0.01;
    	}  else if ( theKeyCode == 87 ) { // w
        	xval = 0.0;
		yval = 0.01;
    	}
    	console.log("here2k");

}

function increaseButton(){

	if(xval != 0){
		if(xval > 0){
		xval = xval + 0.001;}
		else{ xval = xval - 0.001;}
	}

	if(yval != 0){
		if(yval > 0){
		yval = yval + 0.001;}
		else{ yval = yval - 0.001;}
	}

}

function decreaseButton(){
	
	if(xval != 0){
		if(xval > 0){
		xval = xval - 0.001;}
		else{ xval = xval + 0.001;}
	}

	if(yval != 0){
		if(yval > 0){
		yval = yval - 0.001;}
		else{ yval = yval + 0.001;}
	}

}

function movePoly(event){

	console.log("here1");
    	var cx = event.clientX;
    	var cy = event.clientY;
    	
    	tx = 2.0 * cx / 512.0 - 1.0;
    	ty = -(2.0 * cy / 512.0 - 1.0);
    	gl.uniform2f( coordinatesUniform, tx, ty );
    	console.log("here2");

}

function stopStartButton(){

	if(stopStartFlag==1) {stopStartFlag = 0;} 
	else {stopStartFlag = 1;}

}

function render(){

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(myShaderProgram);

	thetaVal = thetaVal + .01 * stopStartFlag;
	gl.uniform1f(thetaUniform, thetaVal);

	tx = tx + xval;
	ty = ty + yval;
	gl.uniform4f(translationUniform, xval, yval, 0.0, 0.0);
	gl.uniform2f(coordinatesUniform, tx, ty);

	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId )
	gl.drawArrays(gl.TRIANGLE_FAN, 0, n);

	requestAnimFrame(render);

}
