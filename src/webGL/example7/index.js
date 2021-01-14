import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import Renderer from './renderer.js';
import Mesh from './mesh.js'

const renderer = new Renderer();
const gl = renderer.webGlContext();

const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();

const mesh = new Mesh(gl);

// Convert mouse click to coordinate system as understood by webGL
renderer.getCanvas().addEventListener('click', (event) =>
{
	let mouseX = event.clientX;
	let mouseY = event.clientY;

	/* Needed in some cases ?
	let rect = renderer.getCanvas().getBoundingClientRect();
	mouseX = mouseX - rect.left;
	mouseY = mouseY - rect.top;*/

	const clipCoordinates = renderer.mouseToClipCoord(mouseX,mouseY);

	const position = new Float32Array([clipCoordinates[0], clipCoordinates[1], 0]);
	const color = new Float32Array([1.0, 0.0, 0.0]);
	mesh.addVertex(position, color);
});

//Draw loop
function animate()
{
	renderer.clear();
	mesh.draw(shader);
	window.requestAnimationFrame(animate);
}

animate();