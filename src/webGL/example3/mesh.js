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
		
		const vColor = shader.uniform("vColor");
		shader.setUniform4f(vColor, new Float32Array([0.0, 1.0, 0.0, 1.0]))

		this.gl.drawArrays(this.gl.POINTS, 0, this.vertexPositionData.length / elementPerVertex);
	}
}
