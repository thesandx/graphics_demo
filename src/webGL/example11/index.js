import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import Renderer from './renderer.js';
import Triangle from './triangle.js'

const renderer = new Renderer();
const gl = renderer.webGlContext();

const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();

const primitives = [];

// Convert mouse click to coordinate system as understood by webGL
renderer.getCanvas().addEventListener('click', (event) =>
{
	for (let index = 0; index < 10; index++) {
		
		primitives.push( new Triangle(gl, -1 + (Math.random()*2), -1 + (Math.random()*2)) );
		
	}
});

//Draw loop
function animate()
{
	renderer.clear();
	primitives.forEach(primitive => {

		primitive.draw(shader);
		
	});
	window.requestAnimationFrame(animate);
}

animate();
shader.delete();