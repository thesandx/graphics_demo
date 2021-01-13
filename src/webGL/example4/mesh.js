export default class Mesh
{
	constructor(gl)
	{
		this.vertexPositionData = new Float32Array([
			0.5, 0.5, 0.0,
			-0.5, 0.5, 0.0,
			0.5, -0.5, 0.0,
			-0.5, -0.5, 0.0,
		]);

		this.vertexColorData = new Float32Array([
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 0.0,
		]);

		this.gl = gl;
	}

	draw(shader)
	{
		const vertexPositionBuffer = this.gl.createBuffer();
		if (!vertexPositionBuffer)
		{
			throw new Error("no webgl");
		}
		let elementPerVertex = 3;
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexPositionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexPositionData, this.gl.STATIC_DRAW);
		
		const aPosition = shader.attribute("aPosition");
		this.gl.enableVertexAttribArray(aPosition);
		this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 0, 0);

		const colorBuffer = this.gl.createBuffer();
		if (!colorBuffer)
		{
			throw new Error("no webgl");
		}
		elementPerVertex = 3;
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexColorData, this.gl.STATIC_DRAW);
		
		const aColor = shader.attribute("aColor");
		this.gl.enableVertexAttribArray(aColor);
		this.gl.vertexAttribPointer(aColor, elementPerVertex, this.gl.FLOAT, false, 0, 0);

		this.gl.drawArrays(this.gl.POINTS, 0, this.vertexPositionData.length / elementPerVertex);
	}
}
