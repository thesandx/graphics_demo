const vertexShaderSrc = `      
        attribute vec4 aPosition;  
        attribute vec4 aColor;  
        varying vec4 vColor;  
        void main () {             
          gl_Position = aPosition; 
		  gl_PointSize = 5.0;     
		  vColor = aColor;
        }                          
	  `;

export default vertexShaderSrc;
