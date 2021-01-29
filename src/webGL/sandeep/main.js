import Render from "./render.js";
import { mat4,vec3} from 'https://cdn.skypack.dev/gl-matrix';
import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import Mesh from './mesh.js'
import Transform from "./transform.js";



const renderer = new Render();
const gl = renderer.webGlContext();


var lastDownTarget, canvas;
let x=0,y=0;
let mode = 0;
let currentmode;
const primitives = [];
let currentSel = "r";
let currentCount = 0;
let currentY = 0;
let currentX = 0;

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
        if(mode==0){
        switch(currentmode){
            case "r":
                 //alert("R pressed");
                 //currentmode = "r";
                 if(mode==0){
                     let count = getTotalShape("r");
                    let json = {
                        "id":"r",
                        "x":x,
                        "y":y,
                        "hori":0.0,
                        "vert":0,
                        "scale":1,
                        "count":count++,
                        "rotate":0
                    }
                    primitives.push(json);
                    drawAll();
                    
                 }
                 break;
            case "s":
                 //alert("R pressed");
                 //currentmode = "s";
                 if(mode==0){
                    let count = getTotalShape("s");
                 let json = {
                    "id":"s",
                    "x":x,
                    "y":y,
                    "hori":0,
                    "vert":0,
                    "scale":1,
                    "count":count++,
                    "rotate":0
                }
                primitives.push(json);
                drawAll();
            }
                
                 break;
            default:
                console.log("kuch nhi");          
        }
    }
    if(mode==1){

       let p = getClosestPrimitive(x,y);
       console.log("current select primitive details \n",JSON.stringify(p));
       currentSel = p.id;
       currentCount = p.count;
       currentX = p.x;
       currentY = p.y;
    }
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
                   currentmode = "t";
                //    if(mode==0){
                //    drawTraingle(x,y);
                //    }
                   break;
                case "r":
                    //alert("R pressed");
                    currentmode = "r";
                    break;
                case "s":
                    currentmode = "s";
                   
                    break;
                case "ArrowLeft":
                    // Left pressed
                    if(mode==1) updatePrimitive(currentSel,-0.1,0,0,0);
                    if(mode==2) updatePrimitive(currentSel,0,0,0,-(Math.PI/2));
                    break;
                case "ArrowRight":
                    // Right pressed
                    if(mode==1) updatePrimitive(currentSel,0.1,0,0,0);
                    if(mode==2) updatePrimitive(currentSel,0,0,0,(Math.PI/2));
                    break;
                case "ArrowUp":
                    // Up pressed
                    if(mode==1) updatePrimitive(currentSel,0,0.1,0,0);
                    break;
                case "ArrowDown":
                    // Down pressed
                    if(mode==1) updatePrimitive(currentSel,0,-0.1,0,0);
                    break;
                case "+":
                    //alert("you pressed +");
                    if(mode==1) {
                        movetToOrigin(currentSel);
                        scale(currentSel,0.1);
                        moveBack(currentSel,0.5,0.5);
                    }
                    break;
                case "-":
                    //alert("you pressed +");
                    if(mode==1){
                        movetToOrigin(currentSel);
                        scale(currentSel,-0.1);
                        moveBack(currentSel,0.5,0.5);
                    }
                    break;
                case "x":
                    //alert("you pressed +");
                    if(mode==1) deletePrimitive(currentSel,currentCount);
                    break;
                default:
                    console.log("kuchh to hua hai,kuchh ho rha hai ;)");


                
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

function getClosestPrimitive(centerX,centerY){
    let close=1000;
    let primitive;
    primitives.forEach(p =>{

        let c = Math.pow((Math.pow(p.x-centerX,2)+Math.pow(p.y-centerY,2)),0.5);
        if(c<close){
            close = c;
            primitive = p;
        }
    });

    return primitive;

}

function getTotalShape(id){
    let count = 0;
    primitives.forEach(p =>{

        if(p.id==id){
           if(p.count>=count){
            count = p.count+1;
        }
       
        }

    });
    return count;
}

function deletePrimitive(id,count){
    primitives.forEach(p =>{

        if(p.id==id && p.count==count){

            console.log("current delete primitive ka details \n"+JSON.stringify(p));
            const index = primitives.indexOf(p);
            if (index > -1) {
              primitives.splice(index, 1);
            }
            
            //primitives.pop(p);
        }

    });
    drawAll();
}

function movetToOrigin(id){

    

    primitives.forEach(p =>{
            
        if(p.id==id && p.count == currentCount){
           p.x = 0;
           p.y = 0;
           console.log(JSON.stringify(p));
        }
        console.log("move to origin ho gya");

    });
    drawAll();

}
function scale(id,scale){

    primitives.forEach(p =>{
            
        if(p.id==id && p.count == currentCount){
           p.scale = p.scale+scale;
           console.log(JSON.stringify(p));
        }
        console.log("move to origin and scale ho gya");

    });
    drawAll();

}
function moveBack(id,x,y){
    primitives.forEach(p =>{
            
        if(p.id==id && p.count == currentCount){
            p.x = x;
            p.y = y;
         }
         console.log("move back ho gya");
         console.log(JSON.stringify(p));
 
     });
     drawAll();
}

function updateCurrent(p){
    currentSel = p.id;
     currentCount = p.count;
     currentY = p.y;
    currentX = p.x;
}

function updatePrimitive(id,x,y,scale,rotate){
    //console.log("rotate ka value"+rotate);
    primitives.forEach(p =>{
            
        if(p.id==id && p.count == currentCount){
           p.x = p.x+x;
           p.y = p.y+y;
           p.scale = p.scale+scale;
           p.rotate = p.rotate+rotate;
           updateCurrent(p);
           console.log(JSON.stringify(p));
        }
        else{
            p.rotate = p.rotate+rotate;
        }
        

    });
    drawAll();
}

function drawAll(){
    console.log("drwa All ke under");
    renderer.clear();
                primitives.forEach(p =>{

                if(p.id=="s"){
                    console.log("square draw");
                    drawSquare(p.x,p.y,p.hori,p.vert,p.scale,p.rotate);
                }
                if(p.id=="r"){
                    drawRectangle(p.x,p.y,p.hori,p.vert,p.scale,p.rotate);
                }

            });
}

function drawSquare(centerX,centerY,hori,vert,scale,rotate){


   //create vertex data
const a = 0.5;
//const b = a;
// centerY = centerY+a/2;
centerY = centerY;
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

     uniform mat4 matrix;
     
     void main() {
         vColor = color;
         gl_Position = matrix * vec4(position, 1);
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

    draw(gl,vertexShader,fragmentShader,6,positionBuffer,colorBuffer,hori,vert,scale,rotate);

}


function drawRectangle(centerX,centerY,hori,vert,scale,rotate){

  


    //create vertex data
 const a = 0.25;
 const b = 2*a;
//  centerY = centerY+a;
 centerY = centerY;
 const vertexData = [
     centerX+a/2, centerY+b/2, 0,
     centerX-a/2, centerY+b/2, 0,
     centerX+a/2, centerY-b/2, 0,
     centerX-a/2, centerY+b/2, 0,
     centerX+a/2, centerY-b/2, 0,
     centerX-a/2, centerY-b/2, 0,
   
 ];

 console.log(x);
 console.log(y);
 //console.log(vertexData);
 
 
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

     uniform mat4 matrix;
     
     void main() {
         vColor = color;
         gl_Position = matrix * vec4(position, 1);
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
 
     draw(gl,vertexShader,fragmentShader,6,positionBuffer,colorBuffer,hori,vert,scale,rotate);
 
 }

//create buffer and bind them to vertexData

function draw(gl,vertexShader,fragmentShader,vertex,positionBuffer,colorBuffer,hori,vert,scale,rotate){


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


    const uniformLocations = {

        matrix:gl.getUniformLocation(program,`matrix`)

    }

    const matrix = mat4.create();
   // console.log(matrix);
    //mat4.translate(matrix,matrix,[hori,vert,0]);
    mat4.scale(matrix,matrix,[scale,scale,scale]);
    mat4.rotate(matrix,matrix,rotate,[0,0,1]);
   // console.log(matrix);

    gl.uniformMatrix4fv(uniformLocations.matrix,false,matrix);

//below last is the number of vertices i.e no.of traingle*3
   gl.drawArrays(gl.TRIANGLES, 0, vertex);
//    gl.deleteShader(vertexShader);
//    gl.deleteShader(fragmentShader);
//    gl.deleteProgram(program);
}


