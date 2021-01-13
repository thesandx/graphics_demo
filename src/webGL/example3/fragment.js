const fragmentShaderSrc = `      
		precision mediump float;   
		uniform vec4 vColor;       
        void main () {               
          gl_FragColor = vec4(vColor, 1.0); 
        }                            
	  `;

export default fragmentShaderSrc;