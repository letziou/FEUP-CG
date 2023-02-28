import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
    this.scene = scene;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			//first definition
			0.5, 0.5, 0.5,		//0
			0.5, -0.5, 0.5,		//1
			0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3
      -0.5, 0.5, -0.5,	//4
      -0.5, 0.5, 0.5,		//5
      -0.5, -0.5, 0.5,	//6
      -0.5, -0.5, -0.5,	//7
			//second definition
			0.5, 0.5, 0.5,		//0
			0.5, -0.5, 0.5,		//1
			0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3
      -0.5, 0.5, -0.5,	//4
      -0.5, 0.5, 0.5,		//5
      -0.5, -0.5, 0.5,	//6
      -0.5, -0.5, -0.5,	//7
			//third definition
			0.5, 0.5, 0.5,		//0
			0.5, -0.5, 0.5,		//1
			0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3
      -0.5, 0.5, -0.5,	//4
      -0.5, 0.5, 0.5,		//5
      -0.5, -0.5, 0.5,	//6
      -0.5, -0.5, -0.5	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,		// right side
      0, 2, 3,		// right side
      3, 2, 7,		// back side
      3, 7, 4,		// back side 
      4, 7, 6,		// left side
      4, 6, 5,		// left side
      5, 6, 1,		// front side
      5, 1, 0,		// front side
      5, 0, 3,		// up side
      5, 3, 4,		// up side
      6, 7, 2,		// down side
      6, 2, 1			// down side
		];

		this.normals = [			// this is apllied to each vertice
			// first loop
			1, 0, 0,		// vertice 0 
			1, 0, 0,		// vertice 1
			1, 0, 0,		// vertice 2
			1, 0, 0,		// vertice 3
			-1, 0, 0,		// vertice 4
			-1, 0, 0,		// vertice 5
			-1, 0, 0,		// vertice 6
			-1, 0, 0,		// vertice 7
			// second loop
			0, 1, 0,		// vertice 0 
			0, -1, 0,		// vertice 1
			0, -1, 0,		// vertice 2
			0, 1, 0,		// vertice 3
			0, 1, 0,		// vertice 4
			0, 1, 0,		// vertice 5
			0, -1, 0,		// vertice 6
			0, 1, 0,		// vertice 7
			// third loop
			0, 0, 1,		// vertice 0 
			0, 0, 1,		// vertice 1
			0, 0, -1,		// vertice 2
			0, 0, -1,		// vertice 3
			0, 0, -1,		// vertice 4
			0, 0, 1,		// vertice 5
			0, 0, 1,		// vertice 6
			0, 0, -1,		// vertice 7
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}