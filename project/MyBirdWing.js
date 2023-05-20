import {CGFobject} from '../lib/CGF.js';
/**
 * MyBirdWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			1, 1, 0,	//2
      2, 0, 0,  //3 
      2, 1, 0,  //4
      3, 1, 0,  //5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, 3, 4, 3, 2, 1, 0,
		];

		this.texCoords = [
			0, 0,
			1, 0,
			1, 1,
			2, 0,
			2, 1,
			3, 1,
	];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

		this.initGLBuffers();
	}
}
