import Render from "./render.js";

import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import Mesh from './mesh.js'



const renderer = new Render();
const gl = renderer.webGlContext();


var lastDownTarget, canvas;
let x=0,y=0;
let mode = 0;

window.onload = function() {
    canvas = renderer.getCanvas();

    document.addEventListener('mousedown', function(event) {
        lastDownTarget = event.target;
        //alert('mousedown');
        let mouseX = event.clientX;
	    let mouseY = event.clientY;
        const clipCoordinates = renderer.mouseToClipCoord(mouseX,mouseY);
        x = clipCoordinates[0];
        y = clipCoordinates[1];
    }, false);

    document.addEventListener('keydown', function(event) {
        //if(lastDownTarget == canvas) {
           // alert('keydown');

           switch(event.key){
               case "m":
                mode = mode+1;
                mode = mode%3;
                document.getElementById("p1").innerHTML = "current-mode-value = "+mode;
                break;

               case "t":
                   //alert("T pressed");
                   if(mode==0){
                   drawTraingle(x,y);
                   }
                   break;
                case "r":
                    //alert("R pressed");
                    if(mode==0){
                    drawRectangle(x,y);
                    }
                    break;
                case "s":
                    //alert("R pressed");
                    if(mode==0){
                    drawSquare(x,y);
                    }
                    break;


                
           }

        //}
    }, false);
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

function drawSquare(centerX,centerY){


   //create vertex data
const a = 0.5;
//const b = a;
const vertexData = [
    centerX+a/2, centerY+a/2, 0,
    centerX-a/2, centerY+a/2, 0,
    centerX+a/2, centerY-a/2, 0,
    centerX-a/2, centerY+a/2, 0,
    centerX+a/2, centerY-a/2, 0,
    centerX-a/2, centerY-a/2, 0,
  
];


//create color data
const colorData = [
    1, 0, 1,    // V1.color R
    1, 0, 1,    // V2.color G
    1, 0, 1  , // V3.color B
    1, 0, 1,    // V1.color R
    1, 0, 1,    // V2.color G
    1, 0, 1   // V3.color B
];
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    
    
    
    
    
    //vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
    
    precision mediump float;
    
    
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;
    
    void main() {
        vColor = color;
        gl_Position = vec4(position, 1);
    }
    `);
    gl.compileShader(vertexShader);
    
    
    //fragment shader
    //color - R,G,B.alpha i.e opacity (range from 0-1)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
    
    precision mediump float;
    varying vec3 vColor;
    
    void main() {
        gl_FragColor = vec4(vColor, 1);
    }
    `);
    gl.compileShader(fragmentShader);

    draw(gl,vertexShader,fragmentShader,6,positionBuffer,colorBuffer);

}

function drawRectangle(centerX,centerY){


    //create vertex data
 const a = 0.25;
 const b = 2*a;
 const vertexData = [
     centerX+a/2, centerY+b/2, 0,
     centerX-a/2, centerY+b/2, 0,
     centerX+a/2, centerY-b/2, 0,
     centerX-a/2, centerY+b/2, 0,
     centerX+a/2, centerY-b/2, 0,
     centerX-a/2, centerY-b/2, 0,
   
 ];
 
 
 //create color data
 const colorData = [
     1, 0, 0,    // V1.color R
     1, 0, 0,    // V2.color G
     1, 0, 0  , // V3.color B
     1, 0, 0,    // V1.color R
     1, 0, 0,    // V2.color G
     1, 0, 0   // V3.color B
 ];
     const positionBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
     
     const colorBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
     
     
     
     
     
     //vertex shader
     const vertexShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertexShader, `
     
     precision mediump float;
     
     
     attribute vec3 position;
     attribute vec3 color;
     varying vec3 vColor;
     
     void main() {
         vColor = color;
         gl_Position = vec4(position, 1);
     }
     `);
     gl.compileShader(vertexShader);
     
     
     //fragment shader
     //color - R,G,B.alpha i.e opacity (range from 0-1)
     const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
     gl.shaderSource(fragmentShader, `
     
     precision mediump float;
     varying vec3 vColor;
     
     void main() {
         gl_FragColor = vec4(vColor, 1);
     }
     `);
     gl.compileShader(fragmentShader);
 
     draw(gl,vertexShader,fragmentShader,6,positionBuffer,colorBuffer);
 
 }


function drawTraingle(centerX, centerY){

    
			
			

   //create vertex data
const vertexData = [
    centerX, centerY + 0.5, 0.0,
    centerX - 0.5, centerY - 0.5, 0.0,
    centerX + 0.5, centerY - 0.5, 0.0,
];


//create color data
const colorData = [
    1, 1, 0,    // V1.color R
    1, 1, 0,   // V2.color G
    1, 1, 0   // V3.color 
];
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
     
    //vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
    
    precision mediump float;
    
    
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;
    
    void main() {
        vColor = color;
        gl_Position = vec4(position, 1);
    }
    `);
    gl.compileShader(vertexShader);
    
    
    //fragment shader
    //color - R,G,B.alpha i.e opacity (range from 0-1)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
    
    precision mediump float;
    varying vec3 vColor;
    
    void main() {
        gl_FragColor = vec4(vColor, 1);
    }
    `);
    gl.compileShader(fragmentShader);

    draw(gl,vertexShader,fragmentShader,3,positionBuffer,colorBuffer);
    
    

}
//create buffer and bind them to vertexData

function draw(gl,vertexShader,fragmentShader,vertex,positionBuffer,colorBuffer){


    //create program
const program = gl.createProgram();

//attach shaders to program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

//enable vertex attributes for vetex and color
const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
//below last is the number of vertices i.e no.of traingle*3
   gl.drawArrays(gl.TRIANGLES, 0, vertex);
//    gl.deleteShader(vertexShader);
//    gl.deleteShader(fragmentShader);
//    gl.deleteProgram(program);
}


