import Render from "./render.js";
import {vec3,mat4} from 'https://cdn.skypack.dev/gl-matrix';



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
let RectX = 0;
let RectY = 0;

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
            case "c":
                
                if(mode==0){
                    let count = getTotalShape("c");
                 let json = {
                    "id":"c",
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

           if(event.keyCode==27){
                //alert("esc pressed");
                window.history.back();
           }

           switch(event.key){
              
            
               case "m":
                mode = mode+1;
                mode = mode%3;
                if(mode==0) clearAllRotation();
                document.getElementById("p1").innerHTML = "current-mode-value = "+mode;
                break;

               case "c":
                   //alert("T pressed");
                   currentmode = "c";
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
                    if(mode==2) {
                        getParentRectangle();
                        rotate(-(Math.PI/4));
                        
                    }
                    break;
                case "ArrowRight":
                    // Right pressed
                    if(mode==1) updatePrimitive(currentSel,0.1,0,0,0);
                    
                    if(mode==2){
                        getParentRectangle();
                        rotate((Math.PI/4));
                    }
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
                        //movetToOrigin(currentSel);
                        scale(currentSel,0.1);
                        //rotate(currentSel,Math.PI/4);
                        //moveBack(currentSel,currentX,currentY);
                    }
                    break;
                case "-":
                    //alert("you pressed +");
                    if(mode==1){
                        //movetToOrigin(currentSel);
                        scale(currentSel,-0.1);
                        //rotate(currentSel,Math.PI/4);
                        //moveBack(currentSel,currentX,currentY);
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

function clearAllRotation(){

    primitives.forEach(p =>{
            p.rotate = 0;
    });
    drawAll()

}

function getParentRectangle(){
    let xmin = 100;
    let xmax = -100;
    let ymin = 100;
    let ymax = -100;
    primitives.forEach(p =>{

        if(p.id=="s"){

            let len = 0.5*p.scale;
            let minx = p.x - len/2;
            let maxx = p.x + len/2;
            let miny = p.y - len/2;
            let maxy = p.y + len/2;


            console.log("values of square are",maxx,minx,maxy,miny);


            if(minx<xmin){
                xmin = minx;
            }
            if(maxx>xmax){
                xmax = maxx;
            }
            if(miny<ymin){
                ymin = miny;
            }
            if(maxy>ymax){
                ymax = maxy;
            }

        }
        if(p.id=="r"){
                let lenx = 0.25*p.scale;
                let leny = 0.50*p.scale;

            let minx = p.x - lenx/2;
            let maxx = p.x + lenx/2;
            let miny = p.y - leny/2;
            let maxy = p.y + leny/2;

            if(minx<xmin){
                xmin = minx;
            }
            if(maxx>xmax){
                xmax = maxx;
            }
            if(miny<ymin){
                ymin = miny;
            }
            if(maxy>ymax){
                ymax = maxy;
            }


        }
        if(p.id=="c"){
            let r = 0.25*p.scale;

        let minx = p.x - r;
        let maxx = p.x + r;
        let miny = p.y - r;
        let maxy = p.y + r;

        if(minx<xmin){
            xmin = minx;
        }
        if(maxx>xmax){
            xmax = maxx;
        }
        if(miny<ymin){
            ymin = miny;
        }
        if(maxy>ymax){
            ymax = maxy;
        }


    }
    });

    console.log("final values are",xmax,xmin,ymax,ymin);

    RectX = (xmax + xmin)/2;
    RectY = (ymax + ymin)/2;

    console.log("cordinates is "+RectX,RectY);


}

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
        console.log("origin move hone se pehle ka details\n"); 
        console.log(JSON.stringify(p));  
        if(p.id==id && p.count == currentCount){
           p.x = 0;
           p.y = 0;   
        }
        //console.log("move to origin ho gya");

    });
    drawAll();

}
function rotate(rotate){
    console.log("rotate ka value is"+rotate);
    primitives.forEach(p =>{   
        p.rotate  = p.rotate+rotate;
    });
    drawAll();
}
function scale(id,scale){

    primitives.forEach(p =>{
        console.log("origin move hone ke baad ka details\ n") ;
        console.log(JSON.stringify(p));
        if(p.id==id && p.count == currentCount){
           p.scale = p.scale+scale;
           
        }
    });
    drawAll();

}

function moveBack(id,x,y){
    
    primitives.forEach(p =>{  
        console.log("origin pe scale ke baad ka details\ n") ;
        console.log(JSON.stringify(p));   
        if(p.id==id && p.count == currentCount){
            p.x = currentX;
            p.y = currentY;
            updateCurrent(p);
         }
         console.log("move back ho gya and details are\n");
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
                    console.log(JSON.stringify(p));
                    drawSquare(p.x,p.y,p.hori,p.vert,p.scale,p.rotate);
                }
                if(p.id=="r"){
                    drawRectangle(p.x,p.y,p.hori,p.vert,p.scale,p.rotate);
                }
                if(p.id=="c"){
                    drawCircle(p.x,p.y,p.scale,p.rotate);
                }

            });
    
}






function drawSquare(centerX,centerY,hori,vert,scale,rotate){


   //create vertex data
let a = 0.5;

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

//console.log("square vertices are "+vertexData)


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

    draw(gl,vertexShader,fragmentShader,6,positionBuffer,colorBuffer,hori,vert,scale,rotate,centerX,centerY);

}

function drawCircle(centerX,centerY,scale,rotate){
    let  center = [centerX,centerY];
    let r = 0.25;
    let points = [];
    let color = [0,0,1];
    let colors = [];
    colors.push(color[0],color[1],color[2]);
    points.push(center[0],center[1],0);
    for (let i = 0; i <= 200; i++){
       // var j = i*Math.PI/180;
        var vert = [center[0]+(r*Math.cos(i*2*Math.PI/200)),center[1]+(r*Math.sin(i*2*Math.PI/200))];
        points.push( vert[0], vert[1] ,0); 
        
    colors.push(color[0],color[1],color[2]);
    }


    const positionBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
      
     //vertex shader
     const vertexShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertexShader, `
     
     precision mediump float;
     
     
     attribute vec3 position;
    

     uniform mat4 matrix;
     
     void main() {
         gl_Position =  matrix*vec4(position,1);
     }
     `);
     gl.compileShader(vertexShader);
     
     
     //fragment shader
     //color - R,G,B.alpha i.e opacity (range from 0-1)
     const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
     gl.shaderSource(fragmentShader, `
     
     precision mediump float;
    
     void main() {
         gl_FragColor = vec4(0,0,1,1);
     }
     `);
     gl.compileShader(fragmentShader);
 
       var shaderProg = gl.createProgram();
    	gl.attachShader(shaderProg, vertexShader);
    	gl.attachShader(shaderProg, fragmentShader);
    	gl.linkProgram(shaderProg);
    	gl.useProgram(shaderProg);
    	if (!gl.getProgramParameter(shaderProg, gl.LINK_STATUS)) {
    		console.error('ERROR linking program!', gl.getProgramInfoLog(shaderProg));
    		return;
    	}
    	gl.validateProgram(shaderProg);
    	if (!gl.getProgramParameter(shaderProg, gl.VALIDATE_STATUS)) {
    		console.error('ERROR validating program!', gl.getProgramInfoLog(shaderProg));
    		return;
    	}
    
    	//associate shader and buffer
    
    	var coord = gl.getAttribLocation(shaderProg, 'position');
    	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);
        
    	//Draw
    	// gl.clearColor(0.0, 0.0, 0.2, 0.0);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        
        const uniformLocations = {

            matrix:gl.getUniformLocation(shaderProg,`matrix`)
    
        }
    
       
       // console.log(matrix);
      
        
       let matrix = mat4.create();
        if(mode ==2){
        mat4.identity(matrix);
        mat4.translate(matrix,matrix,[RectX,RectY,0]);
        mat4.scale(matrix,matrix,[scale,scale,1]);
        mat4.rotate(matrix,matrix,rotate,[0,0,1]);
        mat4.translate(matrix,matrix,[-RectX,-RectY,0]);
        }
        else{
           
            mat4.identity(matrix);
            mat4.translate(matrix,matrix,[centerX,centerY,0]);
            mat4.scale(matrix,matrix,[scale,scale,1]);
            mat4.rotate(matrix,matrix,rotate,[0,0,1]);
            mat4.translate(matrix,matrix,[-centerX,-centerY,0]);
        }
       
        
       // console.log(matrix);
    
        gl.uniformMatrix4fv(uniformLocations.matrix,false,matrix);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, points.length/3);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteProgram(shaderProg);
    }



function drawRectangle(centerX,centerY,hori,vert,scale,rotate){
    //create vertex data
 let a = 0.25;
 let b = 2*a;

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
 
     draw(gl,vertexShader,fragmentShader,6,positionBuffer,colorBuffer,hori,vert,scale,rotate,centerX,centerY);
 
 }

//create buffer and bind them to vertexData

function draw(gl,vertexShader,fragmentShader,vertex,positionBuffer,colorBuffer,hori,vert,scale,rotate,x,y){


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

   
   // console.log(matrix);
  
    
   let matrix = mat4.create();
    if(mode ==2){
        mat4.identity(matrix);
    mat4.translate(matrix,matrix,[RectX,RectY,0]);
    mat4.scale(matrix,matrix,[scale,scale,1]);
    mat4.rotate(matrix,matrix,rotate,[0,0,1]);
    mat4.translate(matrix,matrix,[-RectX,-RectY,0]);
    }
    else{
       
        mat4.identity(matrix);
        mat4.translate(matrix,matrix,[x,y,0]);
        mat4.scale(matrix,matrix,[scale,scale,1]);
        mat4.rotate(matrix,matrix,rotate,[0,0,1]);
        mat4.translate(matrix,matrix,[-x,-y,0]);
    }
   
    
   // console.log(matrix);

    gl.uniformMatrix4fv(uniformLocations.matrix,false,matrix);

//below last is the number of vertices i.e no.of traingle*3
   gl.drawArrays(gl.TRIANGLES, 0, vertex);
   gl.deleteShader(vertexShader);
   gl.deleteShader(fragmentShader);
   gl.deleteProgram(program);
}


