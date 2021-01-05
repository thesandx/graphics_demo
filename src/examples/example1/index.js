const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;

document.querySelector("body").appendChild(canvas);
debugger;
const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
gl.viewport(0, 0, canvas.width, canvas.height);

if (!gl) throw new Error("no webgl");

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShaderSrc = `      
        attribute vec4 aPosition;  
        void main () {             
          gl_Position = aPosition; 
          gl_PointSize = 5.0;     
        }                          
	  `;

const fragmentShaderSrc = `      
        precision mediump float;          
        void main () {               
          gl_FragColor = vec4(1.0,0.0,0.0,1.0); 
        }                            
      `;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSrc);
gl.compileShader(vertexShader);

if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
{
	throw new Error(gl.getShaderInfoLog(vertexShader));
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSrc);
gl.compileShader(fragmentShader);

if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
{
	throw new Error(gl.getShaderInfoLog(fragmentShader));
}

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
{
	throw new Error(gl.getProgramInfoLog(shaderProgram));
}

gl.useProgram(shaderProgram);

const vertexData = new Float32Array([
	0.5, 0.5, 0.0,
	-0.5, 0.5, 0.0,
	0.5, -0.5, 0.0,
	-0.5, -0.5, 0.0,
]);

const elementPerVertex = 3;

const buffer = gl.createBuffer();
if (!buffer)
{
	throw new Error("no webgl");
}

const aPosition = gl.getAttribLocation(shaderProgram, "aPosition");

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
gl.vertexAttribPointer(aPosition, elementPerVertex, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

gl.drawArrays(gl.POINTS, 0, vertexData.length / elementPerVertex);