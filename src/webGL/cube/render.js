export default class Render
{
	constructor()
	{
        
		// this.canvas = document.createElement("canvas");
		// document.querySelector("body").appendChild(this.canvas);

		this.canvas = document.querySelector('canvas');


		const gl = this.canvas.getContext("webgl",{preserveDrawingBuffer: true, antialiasing: false}) || this.canvas.getContext("experimental-webgl");

		if (!gl) throw new Error("WebGL is not supported");
		this.gl = gl;
		this.resizeCanvas();
		window.addEventListener('resize', () => this.resizeCanvas());
	}

	getCanvas(){
		return this.convas;
	}

	getCleintVal(){
		return  this.canvas.clientWidth / this.canvas.clientHeight;
	}

	mouseToClipCoord(mouseX,mouseY) {

		// convert the position from pixels to 0.0 to 1.0
		mouseX = mouseX / this.canvas.width;
		mouseY = mouseY / this.canvas.height;

		// convert from 0->1 to 0->2
		mouseX = mouseX * 2;
		mouseY = mouseY * 2;

		// convert from 0->1 to 0->2
		mouseX = mouseX - 1;
		mouseY = mouseY - 1;

		// flip the axis	
		mouseY = -mouseY; // Coordinates in clip space

		return [mouseX, mouseY]
	}

	webGlContext()
	{
		return this.gl;
	}

	resizeCanvas()
	{
		this.canvas.width = Math.min(window.innerWidth,window.innerHeight);
		this.canvas.height = this.canvas.width
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	clear()
	{
		this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
}