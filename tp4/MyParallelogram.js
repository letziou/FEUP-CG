import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			//first loop
			0, 0, 0,	//0
			1, 0, 0,	//1
			1, 1, 0,	//2
      2, 0, 0,  //3 
      2, 1, 0,  //4
      3, 1, 0,  //5
			//second loop
			0, 0, 0,	//0
			1, 0, 0,	//1
			1, 1, 0,	//2
      2, 0, 0,  //3 
      2, 1, 0,  //4
      3, 1, 0,  //5
		];

		this.indices = [
			0, 1, 2,
			2, 1, 3,
			2, 3, 4,
			4, 3, 5, 
			5, 3, 4,
			4, 3, 2,
			3, 1, 2,
			2, 1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords=[
			1, 1,
			0.75, 0.75,
			0.75, 1,
			0.5, 0.75,
			0.5, 1,
			0.25, 0.75,
	];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

