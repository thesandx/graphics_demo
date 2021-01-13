const vertexShaderSrc = `      
        attribute vec3 aPosition;  
		uniform mat4 uModelViewProjectionMatrix;
  
        void main () {             
          gl_Position = uModelViewProjectionMatrix * aPosition; 
		  gl_PointSize = 5.0;     
        }                          
	  `;

export default vertexShaderSrc;
