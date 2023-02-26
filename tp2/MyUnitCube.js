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
			0.5, 0.5, 0.5,	//0
			0.5, -0.5, 0.5,	//1
			0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3
      -0.5, 0.5, -0.5,	//4
      -0.5, 0.5, 0.5,	//5
      -0.5, -0.5, 0.5,	//6
      -0.5, -0.5, -0.5	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
      0, 2, 3,
      3, 2, 7,
      3, 7, 4,
      4, 7, 6,
      4, 6, 5,
      5, 6, 1,
      5, 1, 0,
      5, 0, 3,
      5, 3, 4,
      6, 7, 2,
      6, 2, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.51);
    this.scene.scale(1, 1, 1);
    super.display();
    this.scene.popMatrix();
  }
}