import Transform from './transform.js'

export default class Mesh
{
	constructor(gl)
	{
		this.vertexAttributesData = new Float32Array([
			//  x , y,  z ,	r , g ,b 
			-0.6, -0.3, 0.0, 1.0, 0.0, 0.0,
			-0.3, 0.3, 0.0, 0.0, 1.0, 0.0,
			0.3, -0.3, 0.0, 0.0, 0.0, 1.0,
			0.6, 0.3, 0.0, 0.0, 0.0, 0.0,
		]);

		this.gl = gl;

		this.vertexAttributesBuffer = this.gl.createBuffer();
		if (!this.vertexAttributesBuffer)
		{
			throw new Error("no webgl");
		}

		this.transform = new Transform();
	}

	draw(shader)
	{
		const uModelViewProjectionMatrix = shader.uniform("uModelViewProjectionMatrix");
		let elementPerVertex = 3;
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexAttributesBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexAttributesData, this.gl.DYNAMIC_DRAW);
		
		const aPosition = shader.attribute("aPosition");
		this.gl.enableVertexAttribArray(aPosition);
		this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 6 * this.vertexAttributesData.BYTES_PER_ELEMENT, 0);

		shader.setUniformMatrix4fv(uModelViewProjectionMatrix, this.transform.getMVPMatrix());

		this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertexAttributesData.length / (2 * elementPerVertex));
		// this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexAttributesData.length / (2 * elementPerVertex));
		// this.gl.drawArrays(this.gl.POINTS, 0, this.vertexAttributesData.length / (2 * elementPerVertex));
	}

	addVertex(position, color)
	{
		this.vertexAttributesData = new Float32Array([...this.vertexAttributesData, ...position, ...color])
	}
}