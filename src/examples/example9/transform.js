import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export default class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		this.scale = vec3.create();
		vec3.set(this.scale, 1, 1, 1);
		this.rotationAngle = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 1, 0, 0);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.mvpMatrix = this.modelTransformMatrix;

		this.updateMVPMatrix();
	}

	getMVPMatrix()
	{
		return this.modelTransformMatrix;
	}

	updateMVPMatrix()
	{
		mat4.identity(this.modelTransformMatrix);
		mat4.translate(this.modelTransformMatrix, this.modelTransformMatrix, this.translate);
		mat4.scale(this.modelTransformMatrix, this.modelTransformMatrix, this.scale);
		mat4.rotate(this.modelTransformMatrix, this.modelTransformMatrix, this.rotationAngle, this.rotationAxis);
	}

	setTranslate(translationVec)
	{
		this.translate = translationVec;
	}

	getTranslate()
	{
		return this.translate;
	}

	setScale(scalingVec)
	{
		this.scale = scalingVec;
	}

	getScale()
	{
		return this.scale;
	}

	setRotate(rotationAxis, rotationAngle)
	{
		this.rotationAngle = rotationAngle;
		this.rotationAxis = rotationAxis;
	}

	getRotate()
	{
		return this.rotate;
	}
}