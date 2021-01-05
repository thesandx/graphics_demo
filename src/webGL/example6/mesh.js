export default class Mesh
{
	constructor(gl)
	{
		this.vertexAttributesData = new Float32Array([
			//  x , y,  z ,	r , g ,b 
			0.5, 0.5, 0.0, 1.0, 0.0, 0.0,
			-0.5, 0.5, 0.0, 0.0, 1.0, 0.0,
			0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
			-0.5, -0.5, 0.0, 0.0, 0.0, 0.0,
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
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexAttributesData, this.gl.STATIC_DRAW);

		this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 6 * this.vertexAttributesData.BYTES_PER_ELEMENT, 0);
		this.gl.enableVertexAttribArray(aPosition);

		this.gl.vertexAttribPointer(aColor, elementPerVertex, this.gl.FLOAT, false, 6 * this.vertexAttributesData.BYTES_PER_ELEMENT, 3 * this.vertexAttributesData.BYTES_PER_ELEMENT);
		this.gl.enableVertexAttribArray(aColor);

		// this.gl.drawArrays(this.gl.LINE_LOOP, 0, this.vertexAttributesData.length / (2 * elementPerVertex));
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexAttributesData.length / (2 * elementPerVertex));
		// this.gl.drawArrays(this.gl.POINTS, 0, this.vertexAttributesData.length / (2 * elementPerVertex));
	}

	addVertex(position, color)
	{
		const newVertexData = new Float32Array([...position, ...color]);
		this.vertexAttributesData.push(newVertexData);
	}
}