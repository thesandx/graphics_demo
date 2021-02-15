import Render from "./render.js";
import {vec3,mat4} from 'https://cdn.skypack.dev/gl-matrix';
import OBJ from 'https://cdn.skypack.dev/webgl-obj-loader'



const renderer = new Render();
const gl = renderer.webGlContext();


var lastDownTarget, canvas;


window.onload = function() {
    gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    
    //debugger;
    var objStr = document.getElementById('blender.obj').innerHTML;
    var meshy = new OBJ.Mesh(objStr);

    var objStr1 = document.getElementById('xaxis.obj').innerHTML;
    var meshx = new OBJ.Mesh(objStr1);

    var objStr2 = document.getElementById('zaxis.obj').innerHTML;
    var meshz = new OBJ.Mesh(objStr2);


    drawXaxis(meshx);
    //debugger;
    drawYaxis(meshy);

    drawZaxis(meshz);
    
    
    
}

// const canvas = document.createElement("canvas");
// // canvas.width = 500;
// // canvas.height = 500;

// // Create WebGL context
// document.querySelector("body").appendChild(canvas);
// const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
// //gl.viewport(0, 0, canvas.width, canvas.height);

if (!gl) {
    throw new Error('WebGL not supported');
}

// vertexData = [...]

// create buffer
// load vertexData into buffer

// create vertex shader
// create fragment shader
// create program
// attach shaders to program

// enable vertex attributes


// draw

function drawZaxis(meshz){
    //create vertex data

	//
	// Create buffer
    //
    


    
    //debugger;

    OBJ.initMeshBuffers(gl, meshz);

    var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, meshz.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshz.vertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshz.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshz.indices), gl.STATIC_DRAW);
 
    //  const positionBuffer = gl.createBuffer();
    //  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);



var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
,
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'void main()',
'{',
'  gl_FragColor = vec4(0.0,0.0,1.0, 1.0);',
'}'
].join('\n');


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);



	gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}
     

 
     draw(gl,vertexShader,fragmentShader,meshz);
 
 }

function drawXaxis(meshx){
    //create vertex data

	//
	// Create buffer
    //
    


    
    //debugger;

    OBJ.initMeshBuffers(gl, meshx);

    var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, meshx.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshx.vertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshx.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshx.indices), gl.STATIC_DRAW);
 
    //  const positionBuffer = gl.createBuffer();
    //  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);



var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
,
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'void main()',
'{',
'  gl_FragColor = vec4(1.0,0.0,0.0, 1.0);',
'}'
].join('\n');


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);



	gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}
     

 
     draw(gl,vertexShader,fragmentShader,meshx);
 
 }


function drawYaxis(mesh){
    //create vertex data

	//
	// Create buffer
    //
    


    
    //debugger;

    OBJ.initMeshBuffers(gl, mesh);

    var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
 
    //  const positionBuffer = gl.createBuffer();
    //  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);



var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
,
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'void main()',
'{',
'  gl_FragColor = vec4(0.0,1.0,0.0, 1.0);',
'}'
].join('\n');


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);



	gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}
     

 
     draw(gl,vertexShader,fragmentShader,mesh);
 
 }

//create buffer and bind them to vertexData

function draw(gl,vertexShader,fragmentShader,mesh){


    //create program
const program = gl.createProgram();

//attach shaders to program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    return;
}
gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    return;
}



var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    mesh.vertexBuffer.itemSize, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    0, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
);


gl.enableVertexAttribArray(positionAttribLocation);
gl.useProgram(program);




var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);
mat4.identity(worldMatrix);
mat4.lookAt(viewMatrix, [5, 5, -15], [0, 0, 0], [0, 1, 0]);
mat4.perspective(projMatrix, Math.PI/8, renderer.getCleintVal(), 0.1, 1000.0);

gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

var xRotationMatrix = new Float32Array(16);
var yRotationMatrix = new Float32Array(16);

//
// Main render loop
//
var identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);
var angle = 0;

    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
   // mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
   // mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
    //mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

    //gl.clearColor(0.75, 0.85, 0.8, 1.0);
    //gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    
    //requestAnimationFrame(loop);
    
   // requestAnimationFrame(loop);
}


