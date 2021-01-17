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
let translation = vec3.create();
let rotationAngle = 0;
let rotationAxis = vec3.create();
let scale = vec3.create();

//Draw loop
function animate()
{
	vec3.set(translation, .5, 0, 0);
	mesh.transform.setTranslate(translation);

	vec3.set(rotationAxis, 0, 0, 1);
	mesh.transform.setRotate(rotationAxis, rotationAngle)

	vec3.set(scale, .5, .5, .5);
	mesh.transform.setScale(scale);

	mesh.transform.updateMVPMatrix();

	rotationAngle += .01;

	if (rotationAngle > Math.PI)
		rotationAngle = 0;

	renderer.clear();
	mesh.draw(shader);
	window.requestAnimationFrame(animate);
}

animate();
shader.delete();