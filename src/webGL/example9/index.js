import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';
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
let translation = vec3.fromValues(.5,.5,0);
let rotationAngle = 0;
let rotationAxis = vec3.fromValues(0,0,1);
let scale = vec3.fromValues(.5,.5,1);

mesh.transform.setTranslate(translation);
mesh.transform.setScale(scale);

//Draw loop
function animate()
{
	mesh.transform.setRotate(rotationAxis, rotationAngle);
	rotationAngle += .01;
	
	mesh.transform.updateMVPMatrix();

	renderer.clear();
	mesh.draw(shader);
	window.requestAnimationFrame(animate);
}

animate();
shader.delete();