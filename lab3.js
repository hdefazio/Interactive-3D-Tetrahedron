var gl;
var program;

var alpha;
var Mx;
var Mxuniform;

var beta;
var My;
var Myuniform;

var gamma;
var Mz;
var Mzuniform;

var tx;
var ty;
var translation;
var truniform;

var sx;
var sy;
var scaling;
var scuniform;

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, 512, 512);
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    alpha = 0.0;
    beta = 0.0;
    gamma = 0.0;
    Mx = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 			0.0, 0.0, 1.0];
    My = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 			0.0, 0.0, 1.0];
    Mz = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 			0.0, 0.0, 1.0];
   
    tx = 0;
    ty = 0;
    translation = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 			0.0, 0.0, 0.0, 0.0, 1.0];
  

    sx = 1.0;
    sy = 1.0;
    scaling = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 			0.0, 0.0, 0.0, 0.0, 1.0];

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    Mxuniform = gl.getUniformLocation(program, "Mx");
    gl.uniformMatrix4fv(Mxuniform, false, flatten(Mx));
    Myuniform = gl.getUniformLocation(program, "My");
    gl.uniformMatrix4fv(Myuniform, false, flatten(My));

    Mzuniform = gl.getUniformLocation(program, "Mz");
    gl.uniformMatrix4fv(Mzuniform, false, flatten(Mz));

    truniform = gl.getUniformLocation(program, "translation");
    gl.uniformMatrix4fv(truniform, false, flatten(translation));

    scuniform = gl.getUniformLocation(program, "scaling");
    gl.uniformMatrix4fv(scuniform, false, flatten(scaling));

    gl.enable(gl.DEPTH_TEST);

    setUpTetrahedron();
    render();

};

function setUpTetrahedron(){

	var vertices = [ vec4( 0.0, 0.6, 0.0, 1 ), //p0
			 vec4( 0.0, -0.6, -0.4, 1), //p1
			 vec4( 0.6, -0.6, 0.4, 1 ), //p2
			 vec4( -0.6, -0.6, 0.4, 1 ) ]; //p3

	var vertexColors = [ vec4( 1.0, 0.0, 0.0, 1.0), //p0
			     vec4( 0.0, 1.0, 0.0, 1.0), //p1
			     vec4( 0.0, 0.0, 1.0, 1.0), //p2
			     vec4( 1.0, 0.2, 0.5, 1.0) ]; //p3

	var indexList = [ 0, 3, 2, //1
			  3, 0, 1, //2
			  1, 0, 2, //3
			  3, 2, 1 ]; //4

	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), 								gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var myPosition = gl.getAttribLocation(program, "myPosition");
	gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(myPosition);

	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), 								gl.STATIC_DRAW);

	var myColor = gl.getAttribLocation( program, "myColor");
	gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( myColor);
	
}

function keyPress(event){
	console.log("here1k");
    	
	var theKeyCode = event.keyCode;
    	if ( theKeyCode == 88 ) { // x
	XRot(); } 
	else if( theKeyCode == 89){ //y
	YRot(); }
	else if( theKeyCode == 90){ //z
	ZRot(); }
	else if(theKeyCode == 65 || theKeyCode == 68 || theKeyCode == 83 || theKeyCode == 87){
	transl(theKeyCode);}
	else if( theKeyCode == 74 || theKeyCode == 75 ){ 
	scale(theKeyCode);}

	console.log("here2k");

}

function XRot(){
	alpha = alpha + 0.1;
	Mx = [1.0, 0.0, 0.0, 0.0, 0.0, Math.cos(alpha), -Math.sin(alpha),
		0.0, 0.0, Math.sin(alpha), Math.cos(alpha), 0.0, 0.0, 0.0, 			0.0, 1.0];
	
	gl.uniformMatrix4fv( Mxuniform, false, flatten(Mx));
	render();

}

function YRot(){
	beta = beta + 0.1;
	My = [Math.cos(beta), 0.0, -Math.sin(beta), 0.0, 0.0, 1.0, 0.0, 
		0.0, Math.sin(beta), 0.0, Math.cos(beta), 0.0, 0.0, 0.0, 			0.0, 1.0];
	gl.uniformMatrix4fv( Myuniform, false, flatten(My));
	render();

}


function ZRot(){ //not working
	gamma = gamma + 0.1;
	Mz = [Math.cos(gamma), Math.sin(gamma), 0.0, 0.0, -Math.sin(gamma),
		Math.cos(gamma), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 			0.0, 1.0];
	gl.uniformMatrix4fv( Mzuniform, false, flatten(Mz));
	render();
}

function transl(theKeyCode){
	if( theKeyCode == 65 ) { // a
        tx = tx + - .03;}
	else if ( theKeyCode == 68 ) { // d
        tx = tx + .03;}  
	else if ( theKeyCode == 83 ) { // s
        ty = ty + - .03;}  
	else if ( theKeyCode == 87 ) { // w
        ty = ty + .03;}

	translation = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 			1.0, 0.0, tx, ty, 0.0, 1.0];
	gl.uniformMatrix4fv(truniform, false, flatten(translation));
	render();

}

function scale(theKeyCode){
	if( theKeyCode == 74 ) { // j
        sx = sx + .01;}
	else if ( theKeyCode == 75 ) { // k
        sy = sy + .01;}

	scaling = [sx, 0.0, 0.0, 0.0, 0.0, sy, 0.0, 0.0, 0.0, 0.0, 0.0, 		0.0, 0.0, 0.0, 0.0, 1.0];
	gl.uniformMatrix4fv(scuniform, false, flatten(scaling));
	render();

}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	var numVertices = 12;
	gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);
}
