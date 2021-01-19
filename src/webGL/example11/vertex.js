const vertexShaderSrc = `      
        attribute vec3 aPosition;  
        attribute vec3 aColor;  
        varying vec3 vColor;  
        void main () {             
          gl_Position = vec4(aPosition, 1.0); 
		  gl_PointSize = 5.0;     
		  vColor = aColor;
        }                          
	  `;

export default vertexShaderSrc;
