export default class Mesh
{
	constructor(gl)
	{
		this.vertexAttributesData = new Float32Array([
			//  x , y,  z ,	r , g ,b 
			-0.5, -0.7, 0.0, 1.0, 0.0, 0.0,
			0.5, -0.7, 0.0, 0.0, 1.0, 0.0,
			-0.5, -0.1, 0.0, 0.0, 0.0, 1.0,
			0.5, -0.1, 0.0, 0.0, 0.0, 0.0,
			0.0, 0.3, 0.0, 0.7, 0.7, 0.7
		]);

		this.vertexIndices = new Uint16Array([
			0, 2,
			2, 4,
			4, 3,
			3, 2,
			2, 1,
			1, 0,
			0, 3,
			3, 1
		]);

		this.gl = gl;

		this.vertexAttributesBuffer = this.gl.createBuffer();
		if (!this.vertexAttributesBuffer)
		{
			throw new Error("no webgl");
		}
	}

	draw(shader)
	{
		const aPosition = shader.attribute("aPosition");
		const aColor = shader.attribute("aColor");
		let elementPerVertex = 3;

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexAttributesBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexAttributesData, this.gl.DYNAMIC_DRAW);

		this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 6 * this.vertexAttributesData.BYTES_PER_ELEMENT, 0);
		this.gl.enableVertexAttribArray(aPosition);

		this.gl.vertexAttribPointer(aColor, elementPerVertex, this.gl.FLOAT, false, 6 * this.vertexAttributesData.BYTES_PER_ELEMENT, 3 * this.vertexAttributesData.BYTES_PER_ELEMENT);
		this.gl.enableVertexAttribArray(aColor);

		const indexBuffer = this.gl.createBuffer();

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndices, this.gl.STATIC_DRAW);

		// draw geometry lines by indices
		this.gl.drawElements(this.gl.LINES, this.vertexIndices.length, this.gl.UNSIGNED_SHORT, indexBuffer);
	}

	addVertex(position, color)
	{
		this.vertexAttributesData = new Float32Array([...this.vertexAttributesData, ...position, ...color])
	}
}