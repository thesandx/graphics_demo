// https://computergraphics.stackexchange.com/questions/2303/what-is-an-index-buffer-and-how-is-it-related-to-vertex-buffers

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
	const canvasWidth = renderer.getCanvas().width;
	const canvasHeight = renderer.getCanvas().height;

	let mouseX = event.clientX;
	let mouseY = event.clientY;

	let rect = renderer.getCanvas().getBoundingClientRect();
	mouseX = mouseX - rect.left;
	mouseY = mouseY - rect.top;

	const u1x = 2 / canvasWidth;
	const u1y = 0;

	const u2x = 0;
	const u2y = 2 / canvasHeight;

	// Mouse coordinates assuming the canvas center is at the center of screen
	mouseX = mouseX - canvasWidth / 2;
	mouseY = -(mouseY - canvasHeight / 2);

	// Find the new coordinate system values in screen coordinates assuming canvas and screem center coincide.
	mouseX = u1x * mouseX + u2x * mouseY;
	mouseY = u1y * mouseX + u2y * mouseY;

	const position = new Float32Array([mouseX, mouseY, 0]);
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

animate(0);