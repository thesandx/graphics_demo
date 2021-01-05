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

//Draw loop
function animate()
{
	renderer.clear();
	mesh.draw(shader);
	window.requestAnimationFrame(animate);
}

animate(0);